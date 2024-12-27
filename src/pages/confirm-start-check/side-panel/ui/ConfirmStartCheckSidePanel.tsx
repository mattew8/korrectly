import { useEffect, useState } from 'react';
import { useExtensionRouter } from '@/shared/router';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';
import { selectTargetElementManager } from '@/feature/select-target-element';

const MAX_PREVIEW_COUNT = 3; // 미리보기로 보여줄 최대 문장 개수

const ConfirmStartCheckSidePanel = () => {
  const { push } = useExtensionRouter();
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreWords = targetWords.length > MAX_PREVIEW_COUNT;
  const displayWords = isExpanded
    ? targetWords
    : targetWords.slice(0, MAX_PREVIEW_COUNT);

  useEffect(() => {
    handleSetSelectedWords();
  }, []);

  const handleSetSelectedWords = async () => {
    const targetWords = await spellCheckWordsStorage.get();
    if (targetWords) {
      setTargetWords(targetWords.filter((word) => word !== ''));
    }
  };

  const handleResetWords = async () => {
    spellCheckWordsStorage.reset();
    await selectTargetElementManager.sendRemoveAllElementMessage();
    push('select-element');
  };

  const handleStartSpellCheck = () => {
    push('spelling-check');
  };

  const handleClose = async () => {
    spellCheckWordsStorage.reset();
    await selectTargetElementManager.sendRemoveAllElementMessage();
    push('');
    window.close();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            맞춤법 검사 시작하기
          </h1>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 transition-colors duration-200 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            종료
          </button>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">검사할 문장:</h3>
            <span className="text-sm text-gray-500">
              총 {targetWords.length}개의 문장
            </span>
          </div>

          <div className="space-y-2 rounded-md bg-gray-50">
            {displayWords.map((word, index) => (
              <div key={index} className="p-2">
                <p className="text-gray-600 break-words">{word}</p>
              </div>
            ))}

            {hasMoreWords && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-2 text-sm text-blue-500 transition-colors duration-200 rounded-md hover:bg-gray-100"
              >
                {isExpanded
                  ? '접기'
                  : `${targetWords.length - MAX_PREVIEW_COUNT}개 더보기`}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleResetWords}
            className="flex-1 px-6 py-2 text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            다시 선택하기
          </button>
          <button
            onClick={handleStartSpellCheck}
            className="flex-1 px-6 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
          >
            검사 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStartCheckSidePanel;
