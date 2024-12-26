import { useEffect } from 'react';
import { selectTargetElementManager } from '@/feature/select-target-element';

const ConfirmStartCheckContentScript = () => {
  useEffect(() => {
    selectTargetElementManager.highlight();
    selectTargetElementManager.onMessage();
    return () => {
      selectTargetElementManager.removeListener();
    };
  }, []);

  return null;
};

export default ConfirmStartCheckContentScript;
