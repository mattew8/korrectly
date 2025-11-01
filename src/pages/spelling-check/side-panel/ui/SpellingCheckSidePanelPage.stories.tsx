import { Meta, StoryObj } from '@storybook/react';

// UI 상태별로 독립적인 컴포넌트를 만들어서 Storybook에서 보여줍니다

const meta: Meta = {
  title: 'Pages/SpellingCheckSidePanelPage',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 로딩 상태
export const Loading: Story = {
  render: () => (
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
  ),
};

// 맞춤법 검사 결과 표시
export const SpellCheckResult: Story = {
  render: () => {
    const spellCheckResults = {
      sentence: '이것은 테스트 문장이예요.',
      error: {
        input: '이예요',
        output: '이에요',
      },
    };

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
              <p className="mt-1 text-red-500">
                {spellCheckResults.error.input}
              </p>
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
              onClick={() => console.log('Apply correction')}
              className="flex-1 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              수정 적용하기
            </button>
            <button
              onClick={() => console.log('Skip correction')}
              className="flex-1 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              다음으로 넘어가기
            </button>
          </div>

          <button
            onClick={() => console.log('Recheck')}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            처음부터 다시 검사하기
          </button>
        </div>
      </div>
    );
  },
};

// 검사 완료 상태
export const Finished: Story = {
  render: () => (
    <div className="p-4">
      <div className="text-center">
        <p className="mb-4">모든 맞춤법 검사가 완료되었습니다!</p>
        <button
          onClick={() => console.log('Recheck')}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          다시 검사하기
        </button>
      </div>
    </div>
  ),
};

// 에러 상태
export const Error: Story = {
  render: () => (
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
          onClick={() => console.log('Retry')}
          className="px-6 py-2 mt-4 text-white transition-colors duration-200 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  ),
};

// 사용 횟수 초과 모달
export const LimitExceeded: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2
          className="mb-4 text-xl font-bold text-gray-800"
          onClick={() => console.log('Reset count limit')}
        >
          무료 사용 횟수 초과
        </h2>
        <p className="mb-6 text-gray-600">
          무료 사용 횟수를 모두 사용하셨습니다. 추가 사용을 원하시면 아래
          이메일로 연락해 주세요.
        </p>
        <p className="mb-6 text-blue-600">mattew4483@gmail.com</p>
        <button
          onClick={() => console.log('Close modal')}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  ),
};
