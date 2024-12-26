import { SpellChecker } from './spell-checker';
import { OpenAIClientImpl } from './lib/open-ai';

export const spellChecker = new SpellChecker(
  new OpenAIClientImpl(process.env.OPENAI_API_KEY || ''),
);
