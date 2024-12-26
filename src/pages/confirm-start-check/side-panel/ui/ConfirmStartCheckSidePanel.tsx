import { useEffect, useState } from 'react';
import { useExtensionRouter } from '@/shared/router';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';

const ConfirmStartCheckSidePanel = () => {
  const { push } = useExtensionRouter();
  const [targetWords, setTargetWords] = useState<string[]>([]);

  useEffect(() => {
    handleSetSelectedWords();
  }, []);

  const handleSetSelectedWords = async () => {
    const targetWords = await spellCheckWordsStorage.get();
    if (targetWords) {
      setTargetWords(targetWords);
    }
  };

  const handleResetWords = () => {
    spellCheckWordsStorage.reset();
    push('select-element');
  };

  const handleStartSpellCheck = () => {
    push('spelling-check');
  };

  return (
    <>
      <div>
        <h3>검사할 단어들:</h3>
        <div>
          {targetWords.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>

      <button onClick={handleResetWords}>재선택</button>
      <button onClick={handleStartSpellCheck}>검사 시작</button>
    </>
  );
};

export default ConfirmStartCheckSidePanel;
