import { SPELL_CHECK_PROMPT } from './data/spell-check-prompt.data';
import { SpellCheckResult } from './model/spell-check.model';
import { OpenAIClient } from './lib/open-ai';

export class SpellChecker {
  private openAIClient: OpenAIClient;

  constructor(openAIClient: OpenAIClient) {
    this.openAIClient = openAIClient;
  }

  async checkSpell(text: string): Promise<SpellCheckResult[]> {
    const completion = await this.openAIClient.chatCompletionsCreate({
      messages: [
        {
          role: 'system',
          content: SPELL_CHECK_PROMPT,
        },
        { role: 'user', content: text },
      ],
      model: 'gpt-4o-mini',
    });

    const answer = completion.choices[0]?.message?.content;
    if (answer === 'ERROR') {
      throw new Error('존재하지 않는 단어입니다!');
    }
    if (answer === null || answer === undefined || answer.length === 0) {
      throw new Error('검색 결과가 없습니다!');
    }
    return JSON.parse(answer) as SpellCheckResult[];
  }
}
