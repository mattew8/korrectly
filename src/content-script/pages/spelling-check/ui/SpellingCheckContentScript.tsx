import { useEffect } from 'react';
import { selectTargetElementManager } from '@/content-script/features/select-target-element';
import { changeDomTextManager } from '@/content-script/features/change-dom-text';
import { highlightWordManager } from '@/content-script/features/highlight-word';

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
