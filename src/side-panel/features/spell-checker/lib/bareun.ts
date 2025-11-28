import { SpellCheckResult } from '@/common/types';
import { BareunResponseDto, BareunRevisionDto } from '../model/bareun';

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

export function convertBareunResponseToSpellCheckResult(
  response: BareunResponseDto,
): SpellCheckResult[] {
  const results: SpellCheckResult[] = [];

  response.revisedBlocks.forEach((block) => {
    block.revisions.forEach((revision) => {
      results.push({
        sentence: block.origin.content,
        result: [
          {
            input: block.origin.content,
            output: revision.revised,
            etype: revision.category,
          },
        ],
      });
    });
  });

  return results;
}
