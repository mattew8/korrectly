import { useExtensionRouter } from '@/shared/router';
import { SelectElementContentScriptPage } from '@/pages/select-element/content-script';
const ContentScript = () => {
  const { path } = useExtensionRouter();

  if (path === 'select-element') {
    return <SelectElementContentScriptPage />;
  }

  return null;
};

export default ContentScript;
