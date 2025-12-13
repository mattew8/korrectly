import { ReactElement } from 'react';
import { useExtensionRouter } from '@/common/router';

export function ConfirmStartSpellCheck({
  words,
  resetWordButton,
  runSpellCheckButton,
}: {
  words: string[];
  resetWordButton: ReactElement;
  runSpellCheckButton: ReactElement;
}) {
  const router = useExtensionRouter();

  function handleClose() {
    router.push('');
    window.close();
  }

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
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

      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            선택된 문장: <span className="text-blue-600">{words.length}개</span>
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          아래 버튼을 눌러 맞춤법 검사를 시작하거나 문장을 다시 선택하세요.
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        {resetWordButton}
        {runSpellCheckButton}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-700">검사할 문장 목록</h3>
        <div className="space-y-2 rounded-md bg-gray-50">
          {words.map((word, index) => (
            <div key={index} className="p-3 transition-colors bg-white border border-gray-100 rounded hover:border-gray-300">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                  {index + 1}
                </span>
                <p className="flex-1 text-gray-700 break-words">{word}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
