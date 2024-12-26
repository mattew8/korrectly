import { useEffect, useState } from 'react';
import { useExtensionRouter } from '@/shared/router';
import { spellChecker, SpellCheckResult } from '@/shared/spell-checker';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';

const SpellingCheckSidePanelPage = () => {
  const { push } = useExtensionRouter();
  const [spellCheckResults, setSpellCheckResults] = useState<
    SpellCheckResult[] | null
  >(null);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    handleCheckSpell();
  }, []);

  const handleCheckSpell = async () => {
    const words = await spellCheckWordsStorage.get();
    if (words === null || words.length === 0) {
      push('select-element');
      return;
    }
    try {
      const result = await spellChecker.checkSpell(words.join(' '));
      setSpellCheckResults(result);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleReCheckSpell = () => {
    push('confirm-start-check');
  };

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  const isLoading = spellCheckResults === null;
  if (isLoading) {
    return <div>검사 중...</div>;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {spellCheckResults.map((result, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="text-red-500">원본: {result.sentence}</div>
            <div className="text-green-500">
              수정: {result.result.map((error) => error.output)}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              설명: {result.result.map((error) => error.etype)}
            </div>
          </div>
        ))}

        <button
          onClick={handleReCheckSpell}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          다시 검사하기
        </button>
      </div>
    </div>
  );
};

export default SpellingCheckSidePanelPage;
