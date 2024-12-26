import { Storage, Listener, chromeStorage } from '@/shared/database';

class SpellCheckWordsStorage {
  constructor(private storage: Storage) {}

  get() {
    return this.storage.get<string[]>('target-words');
  }

  create(words: string[]) {
    return this.storage.create('target-words', words);
  }

  reset() {
    return this.storage.remove('target-words');
  }

  addListener(listener: Listener) {
    this.storage.addListener(listener);
  }

  removeListener(listener: Listener) {
    this.storage.removeListener(listener);
  }
}

export const spellCheckWordsStorage = new SpellCheckWordsStorage(chromeStorage);
