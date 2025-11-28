type KeyType = 'target-words' | 'url' | 'spell-check-results' | 'request-count';
export type Listener = (
  changes: { [key: string]: chrome.storage.StorageChange },
  namespace: chrome.storage.AreaName,
) => void;

export interface Storage {
  get<T>(key: KeyType): Promise<T | null>;
  create(key: KeyType, value: unknown): Promise<void>;
  remove(key: KeyType | KeyType[]): Promise<void>;
  addListener(listener: Listener): void;
  removeListener(listener: Listener): void;
}

export const chromeStorage: Storage = {
  async get(key) {
    const data = await chrome.storage.local.get(key);
    return data[key] || null;
  },

  create(key, value) {
    return chrome.storage.local.set({
      [key]: value,
    });
  },

  remove(key: string | string[]) {
    return chrome.storage.local.remove(key);
  },

  addListener(listener) {
    chrome.storage.onChanged.addListener(listener);
  },

  removeListener(listener) {
    chrome.storage.onChanged.removeListener(listener);
  },
};
