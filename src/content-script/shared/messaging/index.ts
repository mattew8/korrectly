import {
  SendMessageType,
  OnMessageCallbackType,
  ChromeMessageListener,
} from '@/common/chrome-extension-messaging';

/**
 * 메시지 전송
 */
export function sendMessage(message: SendMessageType) {
  return chrome.runtime.sendMessage(message);
}

/**
 * 메시지 수신 (Side Panel 등으로부터)
 */
export function addMessageListener(
  callback: OnMessageCallbackType,
): ChromeMessageListener {
  const listener: ChromeMessageListener = (message, sender) => {
    callback(message, sender);
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
