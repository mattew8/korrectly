import { useEffect } from 'react';

interface Props {
  element: HTMLElement;
}

export function HighLightElement({ element }: Props) {
  useEffect(() => {
    // 하이라이트 스타일 적용
    element.style.position = 'relative';
    element.style.border = '2px solid #4F46E5';
    element.style.borderRadius = '4px';
    element.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.2)';
    element.style.transition = 'all 0.2s ease';
    element.style.backgroundColor = 'rgba(79, 70, 229, 0.02)';

    // 기존 패딩이 없는 경우에만 패딩 추가
    const currentPadding = window.getComputedStyle(element).padding;
    if (currentPadding === '0px') {
      element.style.padding = '8px';
    }

    // 컴포넌트 언마운트 시 하이라이트 제거
    return () => {
      element.style.removeProperty('position');
      element.style.removeProperty('border');
      element.style.removeProperty('border-radius');
      element.style.removeProperty('box-shadow');
      element.style.removeProperty('transition');
      element.style.removeProperty('background-color');
      element.style.removeProperty('padding');
    };
  }, [element]);

  return null;
}
