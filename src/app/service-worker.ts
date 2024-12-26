import { chromeStorage } from '@/shared/database';

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  if (!tabId) {
    return;
  }
  chromeStorage.remove('target-words');
  chrome.sidePanel.open({ tabId });
});
