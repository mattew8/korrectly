export interface BareunRevisionDto {
  document: { content: string; language: string };
  encoding_type: string;
  auto_split_sentence: boolean;
  config: {
    enable_sentence_check: boolean;
  };
}

export interface BareunResponseDto {
  origin: string;
  revised: string;
  revisedBlocks: [
    {
      origin: {
        content: string;
      };
      revised: string;
      revisions: [
        {
          revised: string;
          category: 'SPACING';
          helpId: '띄어쓰기_공통';
        },
      ];
    },
    {
      origin: {
        content: string;
      };
      revised: string;
      revisions: [
        {
          revised: string;
          category: 'TYPO';
          helpId: 'Typo';
        },
      ];
    },
  ];
  helps: {
    Typo: {
      id: 'Typo';
      category: 'TYPO';
      comment: '출현이 가능한 유사한 단어를 추천합니다.';
      examples: [];
      ruleArticle: '';
    };
    띄어쓰기_공통: {
      id: '띄어쓰기_공통';
      category: 'SPACING';
      comment: '문장의 각 단어는 띄어 씀을 원칙으로 한다.';
      examples: ['오늘 날씨 좋다.'];
      ruleArticle: '한글맞춤법, 제1장 총칙, 제2항';
    };
  };
}
