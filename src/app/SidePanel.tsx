import { useExtensionRouter } from '@/shared/router';
import { SelectElementSidePanelPage } from '@/pages/select-element/side-panel';
import { SpellingCheckSidePanelPage } from '@/pages/spelling-check/side-panel';

const SidePanel = () => {
  const { path } = useExtensionRouter();
  if (path === 'select-element') {
    return <SelectElementSidePanelPage />;
  }

  if (path === 'spelling-check') {
    return <SpellingCheckSidePanelPage />;
  }

  return <div>Korrectly</div>;
};

export default SidePanel;
