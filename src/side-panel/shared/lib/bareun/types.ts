export interface BareunRevisionDto {
  document: { content: string; language: string };
  encoding_type: string;
  auto_split_sentence: boolean;
  config: {
    enable_sentence_check: boolean;
  };
}

export type RevisionCategory =
  | 'UNKNOWN'
  | 'GRAMMER'
  | 'WORD'
  | 'SPACING'
  | 'STANDARD'
  | 'TYPO'
  | 'FOREIGN_WORD'
  | 'CONFUSABLE_WORDS'
  | 'SENTENCE'
  | 'CONFIRM';

export interface TextSpan {
  content: string;
  begin_offset: number;
  length: number;
}

export interface Revision {
  revised: string;
  score: number;
  category: RevisionCategory;
  helpId: string;
}

export interface RevisedBlock {
  origin: TextSpan;
  revised: string;
  revisions: Revision[];
  nested?: RevisedBlock[];
  lemma?: string;
  pos?: string;
}

export interface ReviseHelp {
  id: string;
  category: RevisionCategory;
  comment: string;
  examples: string[];
  rule_article: string;
}

export interface RevisedSentence {
  origin: string;
  revised: string;
}

export interface BareunResponseDto {
  origin: string;
  revised: string;
  revised_blocks: RevisedBlock[];
  revised_sentences: RevisedSentence[];
  helps: Record<string, ReviseHelp>;
  language: string;
  tokens_count: number;
}
