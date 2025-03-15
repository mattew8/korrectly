import { useEffect, useState } from 'react';

const useLimitRequestCount = () => {
  const [requestCount, setRequestCount] = useState<number | null>(null);

  useEffect(() => {
    chrome.storage.local.get('request-count').then((data) => {
      if (typeof data['request-count'] === 'number') {
        setRequestCount(data['request-count']);
      }
    });

    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      namespace: chrome.storage.AreaName,
    ) => {
      const newValue = changes['request-count']?.newValue;

      if (namespace === 'local' && typeof newValue === 'number') {
        setRequestCount(newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const incrementRequestCount = () => {
    const count = requestCount ?? 0;
    chrome.storage.local.set({ 'request-count': count + 1 });
  };

  const resetRequestCount = () => {
    chrome.storage.local.set({ 'request-count': 0 });
  };

  return { requestCount, incrementRequestCount, resetRequestCount };
};

export default useLimitRequestCount;
