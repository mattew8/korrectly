import { useEffect, useState } from 'react';
import {
  addMessageListener,
  removeMessageListener,
} from '@/content-script/shared/messaging';
import { SelectElement } from './ui/SelectElement';
import { HighLightElement } from './ui/HighLightElement';

export const SelectElementContentScriptPage = () => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const listener = addMessageListener((message) => {
      if (message.action === 'reselect-spell-check-texts') {
        setSelectedElement(null);
      }
    });
    return () => {
      removeMessageListener(listener);
    };
  }, []);

  function handleSelectElement(element: HTMLElement) {
    const textLines = (element.innerText?.split('\n') || []).filter(
      (line) => line.trim() !== '',
    );
    chrome.runtime.sendMessage({
      action: 'select-spell-check-texts',
      payload: { texts: textLines },
    });
    setSelectedElement(element);
  }

  return selectedElement === null ? (
    <SelectElement onSelect={handleSelectElement} />
  ) : (
    <HighLightElement element={selectedElement} />
  );
};
