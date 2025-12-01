interface SelectSpellCheckTextsMessage {
  action: 'select-spell-check-texts';
  payload: {
    texts: string[];
  };
}

interface ResetSelectTextsMessage {
  action: 'reselect-spell-check-texts';
}

export type SendMessageType =
  | SelectSpellCheckTextsMessage
  | ResetSelectTextsMessage;

export type OnMessageCallbackType = (
  message: SendMessageType,
  sender: chrome.runtime.MessageSender,
) => void | Promise<void>;

export type ChromeMessageListener = (
  message: SendMessageType,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => void | boolean | Promise<void>;
