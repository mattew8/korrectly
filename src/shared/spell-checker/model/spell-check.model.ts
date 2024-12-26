export interface SpellCheckResult {
  /**
   * @description 원본 문장
   */
  sentence: string;
  result: SpellCheckError[];
}

export interface SpellCheckError {
  /**
   * @description 원본 텍스트 세그먼트
   */
  input: string;
  /**
   * @description 수정된 텍스트 세그먼트
   */
  output: string;
  /**
   * @description 오류 유형
   */
  etype: string;
}
