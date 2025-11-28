import { useExtensionRouter } from '@/common/router';

export const SelectElementSidePanelPage = () => {
  const { push } = useExtensionRouter();
  const handleClose = () => {
    push('');
    window.close(); // close side panel
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          검사할 문장을 선택해주세요
        </h1>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="mb-4 text-sm text-gray-600">
            웹 페이지에서 맞춤법 검사를 원하는 텍스트를 선택해주세요.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
            >
              종료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
