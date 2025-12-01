import { SpellCheckResult } from '@/common/types';
import { fetchBareunRevision } from '@/side-panel/shared/lib/bareun';
import {
  convertBareunResponseToSpellCheckResult,
  convertTextToBareunFormat,
} from '../lib/bareun-converter';

export async function checkSpelling(text: string): Promise<SpellCheckResult[]> {
  const data = await fetchBareunRevision(convertTextToBareunFormat(text));
  return convertBareunResponseToSpellCheckResult(data);
}
