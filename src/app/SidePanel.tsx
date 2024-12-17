import { SelectElementSidePanelPage } from '@/pages/select-element/side-panel';
import { useExtensionRouter } from '@/shared/router/extension-router';

const SidePanel = () => {
  const { path } = useExtensionRouter();

  if (path === 'select-element') {
    return <SelectElementSidePanelPage />;
  }

  if (path === 'spelling-check') {
    return <div>검사할 영역을 선택해주세요.</div>;
  }

  return <div>Korrectly</div>;
};

export default SidePanel;
