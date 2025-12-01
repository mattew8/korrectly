import { useExtensionRouter } from '@/common/router';
import { SelectElementSidePanelPage } from '@/side-panel/pages/select-element';
import { SpellingCheckResultPage } from '@/side-panel/pages/spelling-check-result';
import './index.css';

export const SidePanel = () => {
  const { path } = useExtensionRouter();
  if (path === 'select-element') {
    return <SelectElementSidePanelPage />;
  }

  if (path === 'spelling-check-result') {
    return <SpellingCheckResultPage />;
  }

  return null;
};
