import { useEffect } from 'react';
import { SelectMode } from '../utils/select-mode';
import { useExtensionRouter } from '@/shared/router';
import { chromeStorage } from '@/shared/database';

export const SelectElementContentScriptPage = () => {
  const { push } = useExtensionRouter();

  useEffect(() => {
    const selectMode = new SelectMode(document.body);
    selectMode.on(async (element) => {
      const textLines = element.innerText?.split('\n');
      await chromeStorage.create('target-words', textLines);
      push('spelling-check');
    });
    return () => {
      selectMode.off();
    };
  }, []);

  return null;
};
