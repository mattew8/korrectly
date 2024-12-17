import { useEffect } from 'react';
import { SelectMode } from '../utils/select-mode';

export const SelectElementContentScriptPage = () => {
  useEffect(() => {
    const selectMode = new SelectMode(document.body);
    selectMode.on((element) => {
      console.log(element);
    });
    return () => {
      selectMode.off();
    };
  }, []);

  return null;
};
