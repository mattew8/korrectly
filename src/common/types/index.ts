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
  /**
   * @description 오류 카테고리 설명
   */
  description?: string;
  /**
   * @description 관련 규정
   */
  rule?: string;
  /**
   * @description 올바른 사용 예시들
   */
  examples?: string[];
}
