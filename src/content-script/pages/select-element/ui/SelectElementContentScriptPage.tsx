import { useEffect } from 'react';
import { SelectMode } from '../utils/select-mode';
import { useExtensionRouter } from '@/common/router';
import { spellCheckWordsStorage } from '@/content-script/features/select-spell-check-words';
import { selectTargetElementManager } from '@/content-script/features/select-target-element';

export const SelectElementContentScriptPage = () => {
  const { push } = useExtensionRouter();

  useEffect(() => {
    const selectMode = new SelectMode(document.body);
    selectMode.on(async (element) => {
      const textLines = element.innerText?.split('\n');
      await spellCheckWordsStorage.create(textLines);
      selectTargetElementManager.select(element);
      push('confirm-start-check');
    });
    return () => {
      selectMode.off();
    };
  }, []);

  return null;
};
