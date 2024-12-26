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
      element.style.border = '1px solid red';
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
      element.style.border = 'none';
    });
  }
}

export const selectTargetElementManager = new SelectTargetElementManager();
