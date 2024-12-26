import { useEffect, useState } from 'react';
import { Listener } from '@/shared/database';
import { spellCheckWordsStorage } from '../model/spell-check-words-storage';

const useSpellCheckWords = () => {
  const [targetWords, setTargetWords] = useState<string[]>([]);

  useEffect(() => {
    spellCheckWordsStorage.get().then((words) => {
      if (words) {
        setTargetWords(words);
      }
    });
    const listener: Listener = (changes, namespace) => {
      if (namespace === 'local' && changes['target-words']) {
        setTargetWords(changes['target-words'].newValue);
      }
    };
    spellCheckWordsStorage.addListener(listener);
    return () => {
      spellCheckWordsStorage.removeListener(listener);
    };
  }, []);

  return targetWords;
};

export default useSpellCheckWords;
