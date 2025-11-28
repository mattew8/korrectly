import { useExtensionRouter } from '@/common/router';
import { SelectElementSidePanelPage } from '@/side-panel/pages/select-element';
import { ConfirmStartCheckSidePanel } from '@/side-panel/pages/confirm-start-check';
import { SpellingCheckSidePanelPage } from '@/side-panel/pages/spelling-check';
import './index.css';

const SidePanel = () => {
  const { path } = useExtensionRouter();
  if (path === 'select-element') {
    return <SelectElementSidePanelPage />;
  }

  if (path === 'confirm-start-check') {
    return <ConfirmStartCheckSidePanel />;
  }

  if (path === 'spelling-check') {
    return <SpellingCheckSidePanelPage />;
  }

  return null;
};

export default SidePanel;
