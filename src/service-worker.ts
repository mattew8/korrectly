import { chromeStorage } from '@/common/database';

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  if (!tabId) {
    return;
  }
  chromeStorage.create('url', 'select-element');
  chrome.sidePanel.open({ tabId });
});

chrome.runtime.onMessage.addListener(async (message) => {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const tabId = tabs[0]?.id;
  if (tabId === undefined) {
    return;
  }
  return chrome.tabs.sendMessage(tabId, message);
});
