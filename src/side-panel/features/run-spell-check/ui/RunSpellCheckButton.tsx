import { useState } from 'react';
import { useExtensionRouter } from '@/common/router';
import { checkSpelling } from '../api/check-spelling';
import { useSpellCheckResultStore } from '../model/spell-check-result-store';
import { AnimateButton } from './AnimateButton';

export function RunSpellCheckButton({ targetText }: { targetText: string }) {
  const router = useExtensionRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const setResults = useSpellCheckResultStore((state) => state.setResults);

  async function handleSpellCheck() {
    setIsLoading(true);
    try {
      const data = await checkSpelling(targetText);
      setResults(data);
      router.push('spelling-check-result');
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRetry() {
    router.push('select-element');
  }

  if (isError) {
    return (
      <>
        <div className="text-red-500">
          오류가 발생했습니다. 다시 시도해주세요.
        </div>
        <button
          onClick={handleRetry}
          className="flex-1 px-6 py-2 mt-4 text-white transition-colors duration-200 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
        >
          다시 선택하기
        </button>
      </>
    );
  }

  return (
    <AnimateButton onClick={handleSpellCheck} isLoading={isLoading}>
      {isLoading ? '검사 중...' : '검사 시작하기'}
    </AnimateButton>
  );
}
