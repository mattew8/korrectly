import { useEffect } from 'react';
import { selectTargetElementManager } from '@/feature/select-target-element';
import { changeDomTextManager } from '@/feature/change-dom-text';
import { highlightWordManager } from '@/feature/highlight-word';

const SpellingCheckContentScript = () => {
  useEffect(() => {
    const selectedElement = selectTargetElementManager.get();
    if (selectedElement) {
      changeDomTextManager.initializeHistory(selectedElement);
    }

    changeDomTextManager.onMessage((message) => {
      const { targetSentence, targetWord, replaceWord } = message.content;
      changeDomTextManager.replaceText(targetSentence, targetWord, replaceWord);
    });

    highlightWordManager.onMessage((message) => {
      const { targetWord } = message;
      if (selectedElement) {
        highlightWordManager.highlightWord(selectedElement, targetWord);
      }
    });

    return () => {
      changeDomTextManager.removeListener();
      highlightWordManager.removeListener();
    };
  }, []);

  return null;
};

export default SpellingCheckContentScript;
