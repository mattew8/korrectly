import { SpellCheckResult } from './model/spell-check.model';

export class SpellChecker {
  async checkSpell(text: string): Promise<SpellCheckResult[]> {
    const response = await fetch(`${process.env.SERVER_URL}/v1/spell-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });

    return await response.json();
  }
}
