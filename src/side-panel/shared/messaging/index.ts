import type {
  SendMessageType,
  OnMessageCallbackType,
  ChromeMessageListener,
} from '@/common/chrome-extension-messaging';

/**
 * 현재 활성 탭으로 메시지 전송
 */
export async function sendMessage(message: SendMessageType) {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab?.id) {
    console.warn('No active tab found');
    return;
  }

  return chrome.tabs.sendMessage(activeTab.id, message);
}

/**
 * 현재 활성 탭의 메시지만 수신
 */
export function addMessageListener(
  callback: OnMessageCallbackType,
): ChromeMessageListener {
  const listener: ChromeMessageListener = async (message, sender) => {
    if (!sender.tab?.id) return;

    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (sender.tab.id === activeTab?.id) {
      await callback(message, sender);
    }
  };

  chrome.runtime.onMessage.addListener(listener);
  return listener;
}

/**
 * 리스너 제거
 */
export function removeMessageListener(listener: ChromeMessageListener) {
  chrome.runtime.onMessage.removeListener(listener);
}
