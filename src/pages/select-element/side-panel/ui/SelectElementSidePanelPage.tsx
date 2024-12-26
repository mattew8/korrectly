import { useExtensionRouter } from '@/shared/router';

export const SelectElementSidePanelPage = () => {
  const { push } = useExtensionRouter();
  const handleClose = () => {
    push('');
    window.close(); // close side panel
  };

  return (
    <div>
      <h1>검사할 문장을 선택해주세요</h1>
      <button onClick={handleClose}>종료</button>
    </div>
  );
};
