import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialCount = 3) => {
  const [countdown, setCountdown] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);
  const [onComplete, setOnComplete] = useState(null);

  const startCountdown = useCallback((callback) => {
    setCountdown(initialCount);
    setIsActive(true);
    setOnComplete(() => callback);
  }, [initialCount]);

  const stopCountdown = useCallback(() => {
    setIsActive(false);
    setOnComplete(null);
  }, []);

  const resetCountdown = useCallback(() => {
    setCountdown(initialCount);
    setIsActive(false);
    setOnComplete(null);
  }, [initialCount]);

  useEffect(() => {
    let timer;
    
    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isActive && countdown === 0) {
      setIsActive(false);
      if (onComplete) {
        onComplete();
      }
    }
    
    return () => clearTimeout(timer);
  }, [isActive, countdown, onComplete]);

  return {
    countdown,
    isActive,
    startCountdown,
    stopCountdown,
    resetCountdown
  };
};