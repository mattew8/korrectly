export interface ChangeDomTextMessage {
  type: 'change-dom-text';
  content: {
    targetSentence: string;
    targetWord: string;
    replaceWord: string;
  };
}

/**
 * 문장의 변경 이력을 추적하기 위한 인터페이스
 */
interface SentenceHistory {
  originalSentence: string;
  currentSentence: string;
  node: Node;
}

interface Listener {
  (
    message: ChangeDomTextMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: SendResponse,
  ): void;
}
type SendResponse = (response?: () => void) => void;

/**
 * DOM 텍스트 변경을 관리하는 매니저 클래스
 * 문장 단위의 변경 이력을 추적하고, 여러 번의 수정이 발생해도 올바른 위치에 텍스트를 변경할 수 있도록 함
 */
class ChangeDomTextManager {
  private listener: Listener | null = null;
  private sentenceHistory: SentenceHistory[] = [];

  /**
   * 지정된 요소 내의 모든 텍스트 노드를 찾아서 변경 이력을 초기화
   * @param element 텍스트 변경을 추적할 대상 요소
   */
  initializeHistory(element: Element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
    );

    this.sentenceHistory = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      const textContent = currentNode.textContent || '';
      if (textContent.trim()) {
        this.sentenceHistory.push({
          originalSentence: textContent,
          currentSentence: textContent,
          node: currentNode,
        });
      }
      currentNode = walker.nextNode();
    }
  }

  /**
   * 지정된 문장 내의 특정 단어를 새로운 단어로 교체
   * 원본 문장을 기준으로 올바른 노드를 찾아 텍스트를 변경
   * @param targetSentence 변경할 단어가 포함된 원본 문장
   * @param targetWord 변경할 단어
   * @param replaceWord 교체할 새로운 단어
   */
  replaceText(targetSentence: string, targetWord: string, replaceWord: string) {
    const history = this.sentenceHistory.find(
      (h) => h.originalSentence === targetSentence,
    );

    if (history) {
      const newText = history.currentSentence.replace(targetWord, replaceWord);
      history.currentSentence = newText;
      history.node.textContent = newText;
    }
  }

  /**
   * 텍스트 변경 메시지를 다른 컨텍스트(예: content script)로 전송
   */
  sendChangeDomTextMessage(content: ChangeDomTextMessage['content']) {
    chrome.runtime.sendMessage({
      type: 'change-dom-text',
      content,
    });
  }

  /**
   * 텍스트 변경 메시지를 수신하기 위한 리스너 등록
   */
  onMessage(listener: Listener) {
    this.listener = (
      message: ChangeDomTextMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: SendResponse,
    ) => {
      if (message.type === 'change-dom-text') {
        listener(message, sender, sendResponse);
      }
      sendResponse();
    };
    chrome.runtime.onMessage.addListener(this.listener);
  }

  /**
   * 리스너 제거 및 변경 이력 초기화
   */
  removeListener() {
    if (!this.listener) {
      return;
    }
    chrome.runtime.onMessage.removeListener(this.listener);
    this.listener = null;
    this.sentenceHistory = [];
  }
}

export const changeDomTextManager = new ChangeDomTextManager();
