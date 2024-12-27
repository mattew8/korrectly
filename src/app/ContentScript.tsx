import { useExtensionRouter } from '@/shared/router';
import { SelectElementContentScriptPage } from '@/pages/select-element/content-script';
import { ConfirmStartCheckContentScript } from '@/pages/confirm-start-check/content-script';
import { SpellingCheckContentScript } from '@/pages/spelling-check/content-script';

const ContentScript = () => {
  const { path } = useExtensionRouter();

  if (path === 'select-element') {
    return <SelectElementContentScriptPage />;
  }

  if (path === 'confirm-start-check') {
    return <ConfirmStartCheckContentScript />;
  }

  if (path === 'spelling-check') {
    return <SpellingCheckContentScript />;
  }

  return null;
};

export default ContentScript;
