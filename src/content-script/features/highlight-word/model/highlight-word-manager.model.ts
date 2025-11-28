export interface HighlightWordMessage {
  type: 'highlight-word';
  content: {
    targetSentence: string;
    targetWord: string;
  };
}

/**
 * 문장의 하이라이트 상태를 추적하기 위한 인터페이스
 */
interface SentenceHistory {
  originalSentence: string;
  currentSentence: string;
  nodes: Node[];
  highlightedNode: Node | null;
}

type MessageListener = (message: HighlightWordMessage['content']) => void;

interface Listener {
  (
    message: HighlightWordMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: SendResponse,
  ): void;
}
type SendResponse = (response?: () => void) => void;

/**
 * DOM 텍스트 하이라이트를 관리하는 매니저 클래스
 * 문장 단위의 하이라이트 상태를 추적하고, 이전 하이라이트를 제거하면서 새로운 하이라이트를 적용
 */
class HighlightWordManager {
  private listener: Listener | null = null;
  private sentenceHistory: SentenceHistory[] = [];
  private currentHighlight: HTMLElement | null = null;

  /**
   * 지정된 요소 내의 모든 텍스트 노드를 찾아서 하이라이트 이력을 초기화
   * @param element 하이라이트를 추적할 대상 요소
   */
  initializeHistory(element: Element) {
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
    );

    let node = walker.nextNode();
    while (node) {
      if (node.textContent?.trim()) {
        textNodes.push(node);
      }
      node = walker.nextNode();
    }

    this.sentenceHistory = [];
    let currentSentence = '';
    let currentNodes: Node[] = [];

    for (const node of textNodes) {
      const text = node.textContent || '';
      console.log('Node text:', text, 'Length:', text.length);
      currentSentence += text;
      currentNodes.push(node);

      if (text.includes('.') || text.includes('?') || text.includes('!')) {
        if (currentSentence.trim() && currentNodes.length > 0) {
          console.log('Saving sentence:', {
            sentence: currentSentence.trim(),
            nodes: currentNodes.map((n) => ({
              text: n.textContent,
              length: n.textContent?.length,
            })),
          });
          this.sentenceHistory.push({
            originalSentence: currentSentence.trim(),
            currentSentence: currentSentence.trim(),
            nodes: [...currentNodes],
            highlightedNode: null,
          });
        }
        currentSentence = '';
        currentNodes = [];
      }
    }

    if (currentSentence.trim() && currentNodes.length > 0) {
      this.sentenceHistory.push({
        originalSentence: currentSentence.trim(),
        currentSentence: currentSentence.trim(),
        nodes: [...currentNodes],
        highlightedNode: null,
      });
    }
  }

  /**
   * 테스트용 메서드: 단순히 주어진 노드의 특정 범위를 하이라이트
   */
  testHighlight(node: Node, start: number, end: number) {
    try {
      console.log('Test highlight:', {
        node,
        nodeText: node.textContent,
        start,
        end,
      });

      const range = document.createRange();
      const span = document.createElement('span');
      span.style.backgroundColor = 'yellow';

      range.setStart(node, start);
      range.setEnd(node, end);
      range.surroundContents(span);

      console.log('Highlight successful');
      return true;
    } catch (error) {
      console.error('Test highlight failed:', error);
      return false;
    }
  }

  /**
   * 지정된 요소 내의 특정 단어를 하이라이트
   * @param targetElement 검색 대상 요소
   * @param word 하이라이트할 단어
   */
  highlightWord(targetElement: Element, word: string) {
    this.removeCurrentHighlight();

    // 모든 하위 텍스트 노드를 찾기
    const findTextNodes = (element: Node): Node[] => {
      const nodes: Node[] = [];
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
      );

      let node;
      while ((node = walker.nextNode())) {
        nodes.push(node);
      }
      return nodes;
    };

    const textNodes = findTextNodes(targetElement);

    // 단어가 포함된 텍스트 노드 찾기
    const textNode = textNodes.find((node) => {
      const normalizedText = node.textContent?.replace(/\u00A0/g, ' ') || '';
      return normalizedText.includes(word);
    });

    if (!textNode) {
      console.error('Target word not found:', word);
      return;
    }

    try {
      const startIndex = textNode.textContent?.indexOf(word) || 0;
      const range = document.createRange();
      range.setStart(textNode, startIndex);
      range.setEnd(textNode, startIndex + word.length);

      // span 요소 생성 및 맞춤법 검사기 스타일 적용
      const span = document.createElement('span');

      // 맞춤법 검사 대상 단어 스타일
      span.style.textDecoration = 'underline';
      span.style.textDecorationStyle = 'wavy';
      span.style.textDecorationColor = '#FF6B6B';
      span.style.textDecorationThickness = '2px';
      span.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
      span.style.borderRadius = '2px';
      span.style.padding = '0 2px';
      span.style.margin = '0 1px';
      span.style.cursor = 'pointer';

      // range로 선택된 텍스트를 span으로 감싸기
      range.surroundContents(span);

      this.currentHighlight = span;
    } catch (error) {
      console.error('Failed to highlight word:', {
        error,
        word,
        nodeText: textNode.textContent,
      });
    }
  }

  /**
   * 현재 하이라이트된 요소 제거
   */
  removeCurrentHighlight() {
    if (this.currentHighlight) {
      const parent = this.currentHighlight.parentNode;
      if (parent) {
        // span을 제거하고 텍스트 노드로 복원
        parent.replaceChild(
          document.createTextNode(this.currentHighlight.textContent || ''),
          this.currentHighlight,
        );
      }
      this.currentHighlight = null;
    }
  }

  /**
   * 하이라이트 메시지를 다른 컨텍스트(예: content script)로 전송
   */
  sendHighlightWordMessage(content: HighlightWordMessage['content']) {
    chrome.runtime.sendMessage({
      type: 'highlight-word',
      content,
    });
  }

  /**
   * 하이라이트 메시지를 수신하기 위한 리스너 등록
   */
  onMessage(messageListener: MessageListener) {
    this.listener = (
      message: HighlightWordMessage,
      _: chrome.runtime.MessageSender,
      sendResponse: SendResponse,
    ) => {
      if (message.type === 'highlight-word') {
        messageListener(message.content);
      }
      sendResponse();
    };
    chrome.runtime.onMessage.addListener(this.listener);
  }

  /**
   * 리스너 제거 및 하이라이트 이력 초기화
   */
  removeListener() {
    if (!this.listener) {
      return;
    }
    chrome.runtime.onMessage.removeListener(this.listener);
    this.listener = null;
    this.sentenceHistory = [];
    this.removeCurrentHighlight();
  }
}

export const highlightWordManager = new HighlightWordManager();
