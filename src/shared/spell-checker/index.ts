import { SpellChecker } from './spell-checker';
import { OpenAIClientImpl } from './lib/open-ai';

export type {
  SpellCheckResult,
  SpellCheckError,
} from './model/spell-check.model';

export const spellChecker = new SpellChecker(
  new OpenAIClientImpl(process.env.OPENAI_API_KEY || ''),
);
