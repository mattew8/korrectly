import { useState } from 'react';
import { useExtensionRouter } from '@/common/router';

import { useSpellCheckResultStore } from '@/side-panel/features/run-spell-check';
import { getErrorInfoFromSpellCheckResult } from './model/spelling-check-result-error-handling';

export const SpellingCheckResultPage = () => {
  const { push } = useExtensionRouter();
  const spellCheckResults = useSpellCheckResultStore((state) => state.results);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextResult = async () => {
    if (currentIndex < spellCheckResults.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleApplyCorrection = async () => {
    // changeDomTextManager.sendChangeDomTextMessage({
    //   targetSentence: currentResult.sentence,
    //   targetWord: currentResult.error.input,
    //   replaceWord: currentResult.error.output,
    // });
    // await showNextResult();
  };

  const handleSkipCorrection = async () => {
    await showNextResult();
  };

  const handleReCheckSpell = () => {
    push('select-element');
  };

  const currentResult = spellCheckResults[currentIndex];

  const isError = currentResult === undefined;
  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="p-8 space-y-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            오류가 발생했습니다. 다시 시도해주세요.
          </h2>
        </div>
      </div>
    );
  }

  const isLoading = spellCheckResults.length === 0;
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="p-8 space-y-4 text-center">
          <div className="inline-block mb-4 text-4xl animate-spin">
            <span role="img" aria-label="loading">
              ⚡
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            맞춤법 검사 중...
          </h2>
          <p className="text-gray-600">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  const isFinished = currentIndex >= spellCheckResults.length;
  if (isFinished) {
    return (
      <div className="p-4">
        <div className="text-center">
          <p className="mb-4">모든 맞춤법 검사가 완료되었습니다!</p>
          <button
            onClick={handleReCheckSpell}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            다시 검사하기
          </button>
        </div>
      </div>
    );
  }

  const { input, output, categoryLabel, description } =
    getErrorInfoFromSpellCheckResult(currentResult);

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="p-4 bg-white border rounded-lg shadow">
          <h3 className="mb-2 font-bold">
            맞춤법 검사 결과 ({currentIndex + 1}/{spellCheckResults.length})
          </h3>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600">원문:</p>
            <p className="mt-1 text-gray-800">{input}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600">수정 제안:</p>
            <p className="mt-1 text-lg font-semibold text-green-600">
              {output}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600">오류 유형:</p>
            <p className="mt-1">
              <span className="text-red-500">{categoryLabel}</span>
              {description && ` (${description})`}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleApplyCorrection}
            className="flex-1 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            수정 적용하기
          </button>
          <button
            onClick={handleSkipCorrection}
            className="flex-1 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            다음으로 넘어가기
          </button>
        </div>

        <button
          onClick={handleReCheckSpell}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          처음부터 다시 검사하기
        </button>
      </div>
    </div>
  );
};
