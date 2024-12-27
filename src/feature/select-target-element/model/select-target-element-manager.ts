class SelectTargetElementManager {
  // Public methods
  select(element: HTMLElement) {
    element.dataset['korrectlyCheckElement'] = 'true';
  }

  get(): HTMLElement | null {
    return document.querySelector('[data-korrectly-check-element]');
  }

  highlight() {
    const selectedElements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-korrectly-check-element]',
    );
    selectedElements.forEach((element) => {
      // 선택된 요소 스타일링
      element.style.position = 'relative'; // 박스 쉐도우를 위한 position 설정
      element.style.border = '2px solid #4F46E5'; // 인디고 계열 테두리
      element.style.borderRadius = '4px';
      element.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.2)';
      element.style.transition = 'all 0.2s ease';
      element.style.backgroundColor = 'rgba(79, 70, 229, 0.02)';

      // 기존 패딩이 없는 경우에만 패딩 추가
      const currentPadding = window.getComputedStyle(element).padding;
      if (currentPadding === '0px') {
        element.style.padding = '8px';
      }
    });
  }

  // Event related methods
  sendRemoveAllElementMessage() {
    return chrome.runtime.sendMessage({ type: 'remove-all-target-element' });
  }

  onMessage() {
    chrome.runtime.onMessage.addListener(this.listener);
  }

  removeListener() {
    chrome.runtime.onMessage.removeListener(this.listener);
  }

  // Private methods
  private listener = (
    message: { type: string },
    _: chrome.runtime.MessageSender,
    sendResponse: () => void,
  ) => {
    if (message.type === 'remove-all-target-element') {
      this.unhighlight();
      this.reset();
    }
    sendResponse();
  };

  private reset() {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-korrectly-check-element]',
    );
    elements.forEach((element) => {
      delete element.dataset['korrectlyCheckElement'];
    });
  }

  private unhighlight() {
    const selectedElements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-korrectly-check-element]',
    );
    selectedElements.forEach((element) => {
      element.style.removeProperty('position');
      element.style.removeProperty('border');
      element.style.removeProperty('border-radius');
      element.style.removeProperty('box-shadow');
      element.style.removeProperty('transition');
      element.style.removeProperty('background-color');
      element.style.removeProperty('padding');
    });
  }
}

export const selectTargetElementManager = new SelectTargetElementManager();
