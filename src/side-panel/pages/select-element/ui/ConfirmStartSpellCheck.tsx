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
              총 {words.length}개의 문장
            </span>
          </div>

          <div className="space-y-2 rounded-md bg-gray-50">
            {words.map((word, index) => (
              <div key={index} className="p-2">
                <p className="text-gray-600 break-words">{word}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {resetWordButton}
          {runSpellCheckButton}
        </div>
      </div>
    </div>
  );
}
