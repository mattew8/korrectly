import { useEffect, useState } from 'react';
import {
  addMessageListener,
  removeMessageListener,
} from '@/side-panel/shared/messaging';
import { RunSpellCheckButton } from '@/side-panel/features/run-spell-check';
import { SelectElementGuide } from './ui/SelectElementGuide';
import { ConfirmStartSpellCheck } from './ui/ConfirmStartSpellCheck';

export const SelectElementSidePanelPage = () => {
  const [selectedTexts, setSelectedTexts] = useState<string[] | null>(null);

  useEffect(() => {
    const listener = addMessageListener((message) => {
      if (message.action === 'select-spell-check-texts') {
        setSelectedTexts(message.payload.texts);
      }
    });

    return () => {
      removeMessageListener(listener);
      setSelectedTexts(null);
    };
  }, []);

  function handleResetWords() {
    chrome.runtime.sendMessage({ action: 'reselect-spell-check-texts' });
    setSelectedTexts(null);
  }

  const isSelectedTextExist =
    selectedTexts !== null && selectedTexts.length > 0;

  return isSelectedTextExist ? (
    <ConfirmStartSpellCheck
      words={selectedTexts}
      resetWordButton={
        <button
          onClick={handleResetWords}
          className="flex-1 px-6 py-2 text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
        >
          다시 선택하기
        </button>
      }
      runSpellCheckButton={
        <RunSpellCheckButton targetText={selectedTexts?.join(' ')} />
      }
    />
  ) : (
    <SelectElementGuide />
  );
};
