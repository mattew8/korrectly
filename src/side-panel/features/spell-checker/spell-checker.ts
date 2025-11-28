import { fetchBareunRevision } from './api/bareunApi';
import {
  convertBareunResponseToSpellCheckResult,
  convertTextToBareunFormat,
} from './lib/bareun';
import { SpellCheckResult } from '@/common/types';

export class SpellChecker {
  async checkSpell(text: string): Promise<SpellCheckResult[]> {
    const data = await fetchBareunRevision(convertTextToBareunFormat(text));
    return convertBareunResponseToSpellCheckResult(data);
  }
}
