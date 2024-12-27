import { useEffect, useState } from 'react';
import { useExtensionRouter } from '@/shared/router';
// import { spellChecker } from '@/shared/spell-checker';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';
import {
  CurrentSpellCheckResult,
  spellCheckManager,
} from '@/feature/check-spell';
import { changeDomTextManager } from '@/feature/change-dom-text';
import { highlightWordManager } from '@/feature/highlight-word';

const EXAMPLE_RESULT = [
  {
    sentence: '이번 겨울 에는 친구들과 여행을 가기로했어요.',
    result: [
      {
        input: '겨울 에는',
        output: '겨울에는',
        etype: 'error',
      },
      {
        input: '가기로했어요',
        output: '가기로 했어요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '여행지는 바닷가 근처로 정해졌는데요 정말 기대되요.',
    result: [
      {
        input: '기대되요',
        output: '기대돼요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '출발 전 날에는 필요한 짐 을 미리 챙길 생각이에요.',
    result: [
      {
        input: '짐 을',
        output: '짐을',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '따뜻한 옷 이랑 얇은 옷도 같이 챙겨야 겠어요.',
    result: [
      {
        input: '옷 이랑',
        output: '옷이랑',
        etype: 'error',
      },
      {
        input: '챙겨야 겠어요',
        output: '챙겨야겠어요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '먹을거리도 준비 해야하는데 과자와 음료수는 필수죠.',
    result: [
      {
        input: '준비 해야하는데',
        output: '준비해야 하는데',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '그리고 캠핑 장비도 몇 가지 빌려야 될거같아요.',
    result: [
      {
        input: '될거같아요',
        output: '될 것 같아요',
        etype: 'error',
      },
    ],
  },
  {
    sentence:
      '여행 가는 날 아침에는 일찍 일어나야 해요 늦잠 자면 큰일이거든요.',
    result: [
      {
        input: '해요 늦잠',
        output: '해요. 늦잠',
        etype: 'error',
      },
    ],
  },
  {
    sentence:
      '버스를 타고 가면서 친구들이랑 간식 을 먹으며 수다 떨 예정이에요.',
    result: [
      {
        input: '간식 을',
        output: '간식을',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '도착 하면 사진 도 많이 찍고 좋은 추억을 만들고 싶어요.',
    result: [
      {
        input: '도착 하면',
        output: '도착하면',
        etype: 'error',
      },
      {
        input: '사진 도',
        output: '사진도',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '이번 여행이 오래 기억에 남는 멋진 시간이 되었으면 좋겠어요.',
    result: [],
  },
];

const SpellingCheckSidePanelPage = () => {
  const { push } = useExtensionRouter();
  const [spellCheckResults, setSpellCheckResults] = useState<
    CurrentSpellCheckResult | null | 'finished'
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
      // const result = await spellChecker.checkSpell(words.join(' '));
      spellCheckManager.setResults(EXAMPLE_RESULT);
      showNextResult();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const showNextResult = () => {
    const currentResult = spellCheckManager.getCurrentResult();
    if (currentResult) {
      setSpellCheckResults(currentResult);
      highlightWordManager.sendHighlightWordMessage({
        targetSentence: currentResult.sentence,
        targetWord: currentResult.error.input,
      });
    } else {
      setSpellCheckResults('finished');
    }
  };

  const handleApplyCorrection = () => {
    if (spellCheckResults === null || spellCheckResults === 'finished') {
      return;
    }
    changeDomTextManager.sendChangeDomTextMessage({
      targetSentence: spellCheckResults.sentence,
      targetWord: spellCheckResults.error.input,
      replaceWord: spellCheckResults.error.output,
    });
    showNextResult();
  };

  const handleSkipCorrection = () => {
    showNextResult();
  };

  const handleReCheckSpell = () => {
    push('confirm-start-check');
  };

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
