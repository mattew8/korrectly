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
  }

  getCurrentResult(): CurrentSpellCheckResult | null {
    // 결과가 없는 경우
    if (this.spellCheckResults.length === 0) {
      return null;
    }

    const currentResult = this.spellCheckResults[this.currentResultIndex];

    // 현재 result의 오류가 없는 경우
    if (!currentResult?.result || currentResult.result.length === 0) {
      return null;
    }

    const currentError = currentResult.result[this.currentErrorIndex];

    // 다음 인덱스 준비
    this.prepareNextIndex();

    return currentError
      ? {
          sentence: currentResult.sentence,
          error: currentError,
        }
      : null;
  }

  private prepareNextIndex(): void {
    // 현재 result 내의 다음 오류로 이동
    this.currentErrorIndex++;

    // 현재 result의 모든 오류를 확인했다면
    if (
      this.currentErrorIndex >=
      (this.spellCheckResults[this.currentResultIndex]?.result.length ?? 0)
    ) {
      this.currentErrorIndex = 0;
      this.currentResultIndex++;
    }
  }
}

export const spellCheckManager = new SpellCheckManager();
