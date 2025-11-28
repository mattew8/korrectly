import { SpellCheckResult, SpellCheckError } from '@/common/types';

interface CurrentSpellCheckResult {
  sentence: string;
  error: SpellCheckError;
}

export class SpellCheckResultsManager {
  private spellCheckResults: SpellCheckResult[][] = [];
  private wordGroups: string[][] = [];
  private currentGroupIndex = 0;
  private currentResultIndex = 0;
  private currentErrorIndex = 0;
  private readonly FIRST_GROUP_SIZE = 3;
  private readonly GROUP_SIZE = 5;
  private getSpellCheckResults: (
    words: string[],
  ) => Promise<SpellCheckResult[]>;

  constructor(
    getSpellCheckResults: (words: string[]) => Promise<SpellCheckResult[]>,
  ) {
    this.getSpellCheckResults = getSpellCheckResults;
  }

  setInitialWords(words: string[]) {
    this.wordGroups = [];

    // 첫 번째 그룹은 3개만
    if (words.length > 0) {
      this.wordGroups.push(words.slice(0, this.FIRST_GROUP_SIZE));

      // 나머지는 5개씩 그룹화
      for (
        let i = this.FIRST_GROUP_SIZE;
        i < words.length;
        i += this.GROUP_SIZE
      ) {
        this.wordGroups.push(words.slice(i, i + this.GROUP_SIZE));
      }
    }

    this.currentGroupIndex = 0;
    this.spellCheckResults = [];
    this.currentResultIndex = 0;
    this.currentErrorIndex = 0;
  }

  async getCurrentResult(): Promise<CurrentSpellCheckResult | null> {
    // 현재 그룹의 결과가 없으면 가져오기
    if (!this.spellCheckResults[this.currentGroupIndex]) {
      const currentGroup = this.wordGroups[this.currentGroupIndex];
      if (!currentGroup) {
        return null;
      }

      const results = await this.getSpellCheckResults(currentGroup);
      this.spellCheckResults[this.currentGroupIndex] = results;
    }

    const currentGroupResults = this.spellCheckResults[this.currentGroupIndex];
    if (!currentGroupResults) {
      return null;
    }

    // 현재 그룹에서 결과 찾기
    while (this.currentResultIndex < currentGroupResults.length) {
      const currentResult = currentGroupResults[this.currentResultIndex];
      if (currentResult?.result?.length && currentResult.result.length > 0) {
        const currentError = currentResult.result[this.currentErrorIndex];
        if (currentError) {
          // 다음 오류로 이동
          this.moveToNextError();

          // 결과가 2개 이하로 남았으면 다음 그룹 미리 가져오기
          this.prefetchNextGroupIfNeeded();

          return {
            sentence: currentResult.sentence,
            error: currentError,
          };
        }
      }

      // 다음 결과로 이동
      this.currentResultIndex++;
      this.currentErrorIndex = 0;
    }

    // 현재 그룹의 모든 결과를 확인했으면 다음 그룹으로
    if (this.wordGroups[this.currentGroupIndex + 1]) {
      this.currentGroupIndex++;
      this.currentResultIndex = 0;
      this.currentErrorIndex = 0;

      // 재귀 호출 전 이미 prefetch된 결과가 있는지 확인
      if (this.spellCheckResults[this.currentGroupIndex]) {
        // 이미 prefetch된 결과가 있으면 바로 다음 결과 반환
        return this.getCurrentResult();
      } else {
        // prefetch된 결과가 없을 때만 새로 요청
        const nextGroup = this.wordGroups[this.currentGroupIndex];
        if (nextGroup) {
          const results = await this.getSpellCheckResults(nextGroup);
          this.spellCheckResults[this.currentGroupIndex] = results;
          return this.getCurrentResult();
        }
      }
    }

    return null;
  }

  private moveToNextError(): void {
    this.currentErrorIndex++;
    const currentResult =
      this.spellCheckResults[this.currentGroupIndex]?.[this.currentResultIndex];

    if (
      !currentResult?.result ||
      this.currentErrorIndex >= currentResult.result.length
    ) {
      this.currentErrorIndex = 0;
      this.currentResultIndex++;
    }
  }

  private async prefetchNextGroupIfNeeded(): Promise<void> {
    const currentGroupResults = this.spellCheckResults[this.currentGroupIndex];
    if (!currentGroupResults) return;

    // 현재 그룹의 남은 결과 수 계산
    const remainingResults =
      currentGroupResults.length - this.currentResultIndex;
    const isFirstGroup = this.currentGroupIndex === 0;
    const prefetchThreshold = isFirstGroup ? 1 : 2; // 첫 그룹은 1개, 나머지는 2개 남았을 때

    if (
      remainingResults <= prefetchThreshold &&
      this.wordGroups[this.currentGroupIndex + 1] &&
      !this.spellCheckResults[this.currentGroupIndex + 1]
    ) {
      const nextGroup = this.wordGroups[this.currentGroupIndex + 1];
      if (!nextGroup) return;

      const nextResults = await this.getSpellCheckResults(nextGroup);
      this.spellCheckResults[this.currentGroupIndex + 1] = nextResults;
    }
  }
}
