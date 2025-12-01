import { useExtensionRouter } from '@/common/router';
import { SelectElementContentScriptPage } from '@/content-script/pages/select-element';

export const ContentScript = () => {
  const { path } = useExtensionRouter();

  if (path === 'select-element') {
    return <SelectElementContentScriptPage />;
  }

  if (path === 'spelling-check-result') {
    return null;
  }

  return null;
};
