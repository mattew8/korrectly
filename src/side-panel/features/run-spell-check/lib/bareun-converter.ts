import { SpellCheckResult } from '@/common/types';
import {
  BareunRevisionDto,
  BareunResponseDto,
} from '@/side-panel/shared/lib/bareun';

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

  // API 응답이 camelCase 또는 snake_case로 올 수 있음
  const revisedBlocks =
    response.revised_blocks ||
    (response as unknown as { revisedBlocks: typeof response.revised_blocks })
      .revisedBlocks ||
    [];

  const helps = response.helps || {};

  revisedBlocks.forEach((block) => {
    if (!block.revisions || block.revisions.length === 0) return;

    // 가장 높은 점수의 revision 선택
    const bestRevision = block.revisions.reduce((prev, current) => {
      return current.score > prev.score ? current : prev;
    });

    // help 정보 가져오기
    const help = helps[bestRevision.helpId];

    results.push({
      sentence: response.origin,
      result: [
        {
          input: block.origin.content,
          output: bestRevision.revised,
          etype: bestRevision.category,
          description: help?.comment,
          rule:
            help?.rule_article ||
            (help as unknown as { ruleArticle?: string })?.ruleArticle,
          examples: help?.examples,
        },
      ],
    });
  });

  return results;
}
