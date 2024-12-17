export class SelectMode {
  private root: ParentNode;
  private handleClick: ((e: Event) => void) | null = null;
  private target: HTMLElement | null;
  constructor(root: ParentNode) {
    this.root = root;
    this.target = null;
  }

  on(callback: (element: HTMLElement) => void) {
    this.handleClick = (e: Event) => {
      const clickedElement = e.target as HTMLElement;
      this.target = clickedElement;
      clickedElement && callback(clickedElement);
    };

    document.addEventListener('mouseover', this.handleMouseEnter);
    document.addEventListener('mouseout', this.handleMouseLeave);
  }

  off() {
    const prevOverlay = this.root.querySelector(
      "[data-korrectly-overlay='overlay']",
    );
    if (prevOverlay) prevOverlay.remove();
    if (this.handleClick && this.target) {
      this.target.removeEventListener('mousedown', this.handleClick, true);
    }

    document.removeEventListener('mouseover', this.handleMouseEnter);
    document.removeEventListener('mouseout', this.handleMouseLeave);
  }

  private handleMouseEnter = (event: Event) => {
    if (!this.root) return;

    const target = event.target as HTMLElement | null;
    if (!target || !target.innerText) return;

    this.handleClick &&
      target.addEventListener('mousedown', this.handleClick, true);

    const prevOverlay = this.root.querySelector(
      "[data-korrectly-overlay='overlay']",
    );
    if (prevOverlay) prevOverlay.remove();

    const rect = target.getBoundingClientRect();
    const overlay = this.getOverlayDiv(
      rect.width,
      rect.height,
      rect.top,
      rect.left,
    );
    this.root.appendChild(overlay);
  };

  private handleMouseLeave = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const prevOverlay = this.root.querySelector(
      "[data-korrectly-overlay='overlay']",
    );
    if (prevOverlay) prevOverlay.remove();
    // this.handleClick &&
    //   target.removeEventListener("click", this.handleClick, true);

    this.handleClick &&
      target.removeEventListener('mousedown', this.handleClick, true);
  };

  private getOverlayDiv = (
    width: number,
    height: number,
    top: number,
    left: number,
  ) => {
    const overlayElement = document.createElement('div');

    overlayElement.setAttribute('data-korrectly-overlay', 'overlay');
    overlayElement.style.position = 'fixed';
    overlayElement.style.border = '2px solid #3D3DF2';
    overlayElement.style.borderRadius = '4px';
    overlayElement.style.zIndex = '10000';
    overlayElement.style.pointerEvents = 'none';
    overlayElement.style.width = `${width + 4}px`;
    overlayElement.style.height = `${height + 4}px`;
    overlayElement.style.top = `${top - 2}px`;
    overlayElement.style.left = `${left - 2}px`;

    return overlayElement;
  };
}
