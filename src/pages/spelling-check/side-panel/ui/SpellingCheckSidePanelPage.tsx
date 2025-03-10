import { useEffect, useState } from 'react';
import { useExtensionRouter } from '@/shared/router';
import { spellChecker } from '@/shared/spell-checker';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';
import {
  CurrentSpellCheckResult,
  SpellCheckResultsManager,
} from '@/feature/check-spell';
import { changeDomTextManager } from '@/feature/change-dom-text';
import { highlightWordManager } from '@/feature/highlight-word';
import useLimitRequestCount from '../utils/limit-request-count';

const resultsManager = new SpellCheckResultsManager((words) =>
  spellChecker.checkSpell(words.join(' ')),
);

const SpellingCheckSidePanelPage = () => {
  const { push } = useExtensionRouter();
  const [spellCheckResults, setSpellCheckResults] = useState<
    CurrentSpellCheckResult | null | 'finished'
  >(null);
  const [isError, setIsError] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { requestCount, resetRequestCount } = useLimitRequestCount();

  const isCountLoaded = requestCount !== null;
  const isRequestCountUnderLimit = isCountLoaded && requestCount < 20;

  useEffect(() => {
    if (!isCountLoaded) return;
    if (!isRequestCountUnderLimit) {
      setShowLimitModal(true);
      setSpellCheckResults('finished');
      return;
    }
    handleCheckSpell();
  }, [isCountLoaded, isRequestCountUnderLimit]);

  const handleCheckSpell = async () => {
    const words = await spellCheckWordsStorage.get();
    if (!words?.length) {
      push('select-element');
      return;
    }

    try {
      resultsManager.setInitialWords(words);
      const firstResult = await resultsManager.getCurrentResult();
      if (firstResult) {
        setSpellCheckResults(firstResult);
        highlightWordManager.sendHighlightWordMessage({
          targetSentence: firstResult.sentence,
          targetWord: firstResult.error.input,
        });
      } else {
        setSpellCheckResults('finished');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const showNextResult = async () => {
    try {
      const nextResult = await resultsManager.getCurrentResult();
      if (nextResult) {
        setSpellCheckResults(nextResult);
        highlightWordManager.sendHighlightWordMessage({
          targetSentence: nextResult.sentence,
          targetWord: nextResult.error.input,
        });
      } else {
        setSpellCheckResults('finished');
      }
    } catch (error) {
      console.error('Failed to get next result:', error);
      setIsError(true);
    }
  };

  const handleApplyCorrection = async () => {
    if (spellCheckResults === null || spellCheckResults === 'finished') {
      return;
    }
    changeDomTextManager.sendChangeDomTextMessage({
      targetSentence: spellCheckResults.sentence,
      targetWord: spellCheckResults.error.input,
      replaceWord: spellCheckResults.error.output,
    });
    await showNextResult();
  };

  const handleSkipCorrection = async () => {
    await showNextResult();
  };

  const handleReCheckSpell = () => {
    push('confirm-start-check');
  };

  if (showLimitModal) {
    const handleResetCountLimit = () => {
      resetRequestCount();
      setShowLimitModal(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h2
            className="mb-4 text-xl font-bold text-gray-800"
            onClick={handleResetCountLimit}
          >
            무료 사용 횟수 초과
          </h2>
          <p className="mb-6 text-gray-600">
            무료 사용 횟수를 모두 사용하셨습니다. 추가 사용을 원하시면 아래
            이메일로 연락해 주세요.
          </p>
          <p className="mb-6 text-blue-600">mattew4483@gmail.com</p>
          <button
            onClick={() => setShowLimitModal(false)}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="p-8 space-y-4 text-center">
          <div className="mb-4 text-5xl text-red-500">
            <span role="img" aria-label="error">
              ⚠️
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-600">
            맞춤법 검사 중 문제가 발생했습니다. 다시 시도해 주세요.
          </p>
          <button
            onClick={handleReCheckSpell}
            className="px-6 py-2 mt-4 text-white transition-colors duration-200 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  const isLoading = spellCheckResults === null;
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

  // 모든 검사가 완료된 경우
  if (spellCheckResults === 'finished') {
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

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="p-4 bg-white border rounded-lg shadow">
          <h3 className="mb-2 font-bold">맞춤법 검사 결과</h3>
          <div className="mb-4">
            <p className="text-gray-600">문장:</p>
            <p className="mt-1">{spellCheckResults.sentence}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">오류 내용:</p>
            <p className="mt-1 text-red-500">{spellCheckResults.error.input}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">수정 제안:</p>
            <p className="mt-1 text-green-500">
              {spellCheckResults.error.output}
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

export default SpellingCheckSidePanelPage;
