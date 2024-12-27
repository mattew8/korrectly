import { useExtensionRouter } from '@/shared/router';
import { SelectElementSidePanelPage } from '@/pages/select-element/side-panel';
import { ConfirmStartCheckSidePanel } from '@/pages/confirm-start-check/side-panel';
import { SpellingCheckSidePanelPage } from '@/pages/spelling-check/side-panel';
import './assets/index.css';

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
