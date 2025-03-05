import { SpellCheckResult, SpellCheckError } from '@/shared/spell-checker';

export interface CurrentSpellCheckResult {
  sentence: string;
  error: SpellCheckError;
}

export class SpellCheckManager {
  private spellCheckResults: SpellCheckResult[] = [];
  private currentResultIndex = 0;
  private currentErrorIndex = 0;
  private wordGroups: string[][] = [];
  private currentGroupIndex = 0;
  private readonly GROUP_SIZE = 5;

  setInitialWords(words: string[]) {
    // words를 5개씩 그룹화
    this.wordGroups = [];
    for (let i = 0; i < words.length; i += this.GROUP_SIZE) {
      this.wordGroups.push(words.slice(i, i + this.GROUP_SIZE));
    }
    this.currentGroupIndex = 0;
    this.spellCheckResults = [];
    this.currentResultIndex = 0;
    this.currentErrorIndex = 0;
  }

  getCurrentGroup(): string[] | null {
    return this.wordGroups[this.currentGroupIndex] || null;
  }

  getNextGroup(): string[] | null {
    return this.wordGroups[this.currentGroupIndex + 1] || null;
  }

  appendResults(results: SpellCheckResult[]) {
    this.spellCheckResults.push(...results);
  }

  shouldFetchNextGroup(): boolean {
    // 현재 그룹의 마지막 결과를 보고 있고, 다음 그룹이 존재하는 경우
    return (
      this.currentResultIndex === this.spellCheckResults.length - 1 &&
      this.currentGroupIndex < this.wordGroups.length - 1
    );
  }

  moveToNextGroup() {
    this.currentGroupIndex++;
  }

  isLastGroup(): boolean {
    return this.currentGroupIndex === this.wordGroups.length - 1;
  }

  getCurrentResult(): CurrentSpellCheckResult | null {
    // 현재 그룹의 결과가 없으면 null 반환
    if (this.currentResultIndex >= this.spellCheckResults.length) {
      return null;
    }

    // 현재 result부터 시작해서 오류가 있는 첫 번째 result를 찾음
    while (this.currentResultIndex < this.spellCheckResults.length) {
      const currentResult = this.spellCheckResults[this.currentResultIndex];
      if (!currentResult) {
        this.currentResultIndex++;
        this.currentErrorIndex = 0;
        continue;
      }

      if (currentResult.result && currentResult.result.length > 0) {
        const currentError = currentResult.result[this.currentErrorIndex];
        if (!currentError) {
          this.prepareNextIndex();
          continue;
        }

        this.prepareNextIndex();
        return {
          sentence: currentResult.sentence,
          error: currentError,
        };
      }

      this.currentResultIndex++;
      this.currentErrorIndex = 0;
    }

    return null;
  }

  private prepareNextIndex(): void {
    this.currentErrorIndex++;

    const currentResult = this.spellCheckResults[this.currentResultIndex];
    // 현재 result의 모든 오류를 확인했다면
    if (
      !currentResult?.result ||
      this.currentErrorIndex >= currentResult.result.length
    ) {
      this.currentErrorIndex = 0;
      this.currentResultIndex++;
    }
  }
}

export const spellCheckManager = new SpellCheckManager();
