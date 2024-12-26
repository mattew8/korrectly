import { useEffect } from 'react';
import { SelectMode } from '../utils/select-mode';
import { useExtensionRouter } from '@/shared/router';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';

export const SelectElementContentScriptPage = () => {
  const { push } = useExtensionRouter();

  useEffect(() => {
    const selectMode = new SelectMode(document.body);
    selectMode.on(async (element) => {
      const textLines = element.innerText?.split('\n');
      await spellCheckWordsStorage.create(textLines);
      push('confirm-start-check');
    });
    return () => {
      selectMode.off();
    };
  }, []);

  return null;
};
