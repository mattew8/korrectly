import { SpellChecker } from './spell-checker';

export type {
  SpellCheckResult,
  SpellCheckError,
} from './model/spell-check.model';

export const spellChecker = new SpellChecker();
