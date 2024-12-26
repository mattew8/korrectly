import { chromeStorage } from '@/shared/database';
import { spellCheckWordsStorage } from '@/feature/select-spell-check-words';

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  if (!tabId) {
    return;
  }
  spellCheckWordsStorage.reset();
  chromeStorage.create('url', 'select-element');
  chrome.sidePanel.open({ tabId });
});
