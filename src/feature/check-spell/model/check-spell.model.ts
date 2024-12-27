import { SpellCheckResult, SpellCheckError } from '@/shared/spell-checker';

export interface CurrentSpellCheckResult {
  sentence: string;
  error: SpellCheckError;
}

export class SpellCheckManager {
  private spellCheckResults: SpellCheckResult[] = [];
  private currentResultIndex = 0;
  private currentErrorIndex = 0;

  setResults(spellCheckResults: SpellCheckResult[]) {
    this.spellCheckResults = spellCheckResults;
    this.currentResultIndex = 0;
    this.currentErrorIndex = 0;
  }

  getCurrentResult(): CurrentSpellCheckResult | null {
    // 모든 결과를 검사했다면 null 반환
    if (this.currentResultIndex >= this.spellCheckResults.length) {
      return null;
    }

    // 현재 result부터 시작해서 오류가 있는 첫 번째 result를 찾음
    while (this.currentResultIndex < this.spellCheckResults.length) {
      const currentResult = this.spellCheckResults[this.currentResultIndex];

      // currentResult가 undefined인 경우 다음으로 넘어감
      if (!currentResult) {
        this.currentResultIndex++;
        this.currentErrorIndex = 0;
        continue;
      }

      // 현재 result에 오류가 있는지 확인
      if (currentResult.result && currentResult.result.length > 0) {
        const currentError = currentResult.result[this.currentErrorIndex];

        // currentError가 undefined인 경우 다음으로 넘어감
        if (!currentError) {
          this.prepareNextIndex();
          continue;
        }

        // 다음 검사를 위해 인덱스 준비
        this.prepareNextIndex();

        return {
          sentence: currentResult.sentence,
          error: currentError,
        };
      }

      // 현재 result에 오류가 없다면 다음 result로 이동
      this.currentResultIndex++;
      this.currentErrorIndex = 0;
    }

    // 모든 result를 검사했지만 오류를 찾지 못한 경우
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
