import { useEffect, useState } from 'react';
import { chromeStorage, Listener } from '@/shared/database';

const useSpellingCheckWords = () => {
  const [targetWords, setTargetWords] = useState<string[]>([]);

  useEffect(() => {
    chromeStorage.get<string[]>('target-words').then((words) => {
      if (words) {
        setTargetWords(words);
      }
    });

    const listener: Listener = (changes, namespace) => {
      if (namespace === 'local' && changes['target-words']) {
        setTargetWords(changes['target-words'].newValue);
      }
    };
    chromeStorage.addListener(listener);
    return () => {
      chromeStorage.removeListener(listener);
    };
  }, []);

  return targetWords;
};

export default useSpellingCheckWords;
