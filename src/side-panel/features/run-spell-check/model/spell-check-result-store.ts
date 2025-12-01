import { create } from 'zustand';
import type { SpellCheckResult } from '@/common/types';

interface SpellCheckResultState {
  results: SpellCheckResult[];
  setResults: (results: SpellCheckResult[]) => void;
  clearResults: () => void;
}

export const useSpellCheckResultStore = create<SpellCheckResultState>(
  (set) => ({
    results: [],
    setResults: (results) => set({ results }),
    clearResults: () => set({ results: [] }),
  }),
);
