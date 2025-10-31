import { BareunRevisionDto } from '../model/bareun';

export function convertTextToBareunFormat(text: string): BareunRevisionDto {
  return {
    document: {
      content: text,
      language: 'ko-KR',
    },
    encoding_type: 'UTF32',
    auto_split_sentence: true,
    config: {
      enable_sentence_check: true,
    },
  };
}
