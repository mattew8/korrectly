type KeyType = 'target-words';
export type Listener = (
  changes: { [key: string]: chrome.storage.StorageChange },
  namespace: chrome.storage.AreaName,
) => void;

export interface Storage {
  get<T>(key: KeyType): Promise<T | null>;
  create(key: KeyType, value: unknown): Promise<void>;
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

  addListener(listener) {
    chrome.storage.onChanged.addListener(listener);
  },

  removeListener(listener) {
    chrome.storage.onChanged.removeListener(listener);
  },
};
