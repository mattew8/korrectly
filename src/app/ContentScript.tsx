import { useExtensionRouter } from '@/shared/router';
import { SelectElementContentScriptPage } from '@/pages/select-element/content-script';
import { ConfirmStartCheckContentScript } from '@/pages/confirm-start-check/content-script';
import './assets/index.css';

const ContentScript = () => {
  const { path } = useExtensionRouter();

  if (path === 'select-element') {
    return <SelectElementContentScriptPage />;
  }

  if (path === 'confirm-start-check') {
    return <ConfirmStartCheckContentScript />;
  }

  return null;
};

export default ContentScript;
