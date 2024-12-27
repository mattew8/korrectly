import { useEffect } from 'react';
import { selectTargetElementManager } from '@/feature/select-target-element';
import {
  changeDomTextManager,
  ChangeDomTextMessage,
} from '@/feature/change-dom-text';

const SpellingCheckContentScript = () => {
  useEffect(() => {
    const selectedElement = selectTargetElementManager.get();
    if (selectedElement) {
      changeDomTextManager.initializeHistory(selectedElement);
    }

    changeDomTextManager.onMessage((message: ChangeDomTextMessage) => {
      const { targetSentence, targetWord, replaceWord } = message.content;
      changeDomTextManager.replaceText(targetSentence, targetWord, replaceWord);
    });

    return () => {
      changeDomTextManager.removeListener();
    };
  }, []);

  return null;
};

export default SpellingCheckContentScript;
