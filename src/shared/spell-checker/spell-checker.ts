import { fetchBareunRevision } from './api/bareunApi';
import {
  convertBareunResponseToSpellCheckResult,
  convertTextToBareunFormat,
} from './lib/bareun';
import { SpellCheckResult } from './model/spell-check.model';

export class SpellChecker {
  async checkSpell(text: string): Promise<SpellCheckResult[]> {
    const data = await fetchBareunRevision(convertTextToBareunFormat(text));
    return convertBareunResponseToSpellCheckResult(data);
  }
}
