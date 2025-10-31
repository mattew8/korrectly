interface BareunRevisionDto {
  document: { content: string; language: string };
  encoding_type: string;
  config: {
    enable_sentence_check: boolean;
  };
}

export function convertTextToBareunFormat(text: string): BareunRevisionDto {
  return {
    document: {
      content: text,
      language: 'ko-KR',
    },
    encoding_type: 'UTF32',
    config: {
      enable_sentence_check: true,
    },
  };
}
