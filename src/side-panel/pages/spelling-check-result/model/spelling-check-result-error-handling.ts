import { SpellCheckError, SpellCheckResult } from '@/common/types';

export function getErrorInfoFromSpellCheckResult(
  currentResult: SpellCheckResult,
): SpellCheckError & {
  categoryLabel: string;
  description: string;
} {
  const errorInfo = currentResult.result[0];
  return {
    ...(errorInfo || {
      input: currentResult.sentence,
      output: '',
      etype: 'UNKNOWN',
    }),
    categoryLabel:
      CATEGORY_LABELS[errorInfo?.etype || 'UNKNOWN'] || '알 수 없는 오류',
    description: errorInfo?.description || '',
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  GRAMMER: '어법',
  WORD: '단어 규칙',
  SPACING: '띄어쓰기',
  STANDARD: '표준어',
  TYPO: '오탈자',
  FOREIGN_WORD: '외래어 표기법',
  CONFUSABLE_WORDS: '혼동하기 쉬운 단어',
  SENTENCE: '문장 단위 오류',
  CONFIRM: '확인 필요',
  UNKNOWN: '알 수 없는 오류',
};
