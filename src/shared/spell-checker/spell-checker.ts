import { convertTextToBareunFormat } from './lib/bareun';
import { SpellCheckResult } from './model/spell-check.model';

export class SpellChecker {
  async checkSpell(text: string): Promise<SpellCheckResult[]> {
    const response = await fetch(
      `${process.env.BAREUN_SERVER_URL}/bareun.RevisionService/CorrectError`, // Bareun 문장 교정 API
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BAREUN_API_KEY || '',
        },
        body: JSON.stringify(convertTextToBareunFormat(text)),
      },
    );
    return await response.json();
  }
}
