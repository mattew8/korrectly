import { useEffect } from 'react';
import { SelectMode } from '../lib/select-mode';

export function SelectElement({
  onSelect,
}: {
  onSelect: (element: HTMLElement) => void;
}) {
  useEffect(() => {
    const selectMode = new SelectMode(document.body);
    selectMode.on((element) => {
      onSelect(element);
      const textLines = (element.innerText?.split('\n') || []).filter(
        (line) => line.trim() !== '',
      );
      chrome.runtime.sendMessage({
        action: 'select-spell-check-texts',
        payload: { texts: textLines },
      });
    });
    return () => {
      selectMode.off();
    };
  }, []);

  return null;
}
