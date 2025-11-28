import { useExtensionRouter } from '@/common/router';
import { SelectElementContentScriptPage } from '@/content-script/pages/select-element';
import { ConfirmStartCheckContentScript } from '@/content-script/pages/confirm-start-check';
import { SpellingCheckContentScript } from '@/content-script/pages/spelling-check';

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
