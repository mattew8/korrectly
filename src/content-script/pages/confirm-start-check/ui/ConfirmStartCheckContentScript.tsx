import { useEffect } from 'react';
import { selectTargetElementManager } from '@/content-script/features/select-target-element';

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
