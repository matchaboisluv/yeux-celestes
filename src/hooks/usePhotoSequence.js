import { useState, useCallback, useRef } from 'react';
import { useCountdown } from './useCountdown';
import { usePhotoCapture } from './usePhotoCapture';

export const usePhotoSequence = (maxPhotos = 3) => {
  const [currentFilter, setCurrentFilter] = useState('none');
  const countdown = useCountdown(3);
  const photoCapture = usePhotoCapture(maxPhotos);
  const photoCountRef = useRef(0);

  const captureNextPhoto = useCallback((videoElement) => {
    // check if we've already reached max photos before capturing
    if (photoCountRef.current >= maxPhotos) {
      photoCapture.stopCaptureSequence();
      countdown.resetCountdown();
      return;
    }

    const photo = photoCapture.capturePhoto(videoElement, currentFilter);
    
    if (photo) {
      photoCountRef.current += 1;
      
      // check if we need more photos
      if (photoCountRef.current < maxPhotos) {
        // start next countdown if more photos needed
        setTimeout(() => {
          countdown.startCountdown(() => captureNextPhoto(videoElement));
        }, 500);
      } else {
        // sequence complete -> stop everything
        photoCapture.stopCaptureSequence();
        countdown.resetCountdown();
      }
    }
  }, [currentFilter, photoCapture, countdown, maxPhotos]);

  const startSequence = useCallback((videoElement) => {
    if (!videoElement || photoCapture.isCapturing || photoCapture.isSequenceComplete) return;
    
    photoCountRef.current = 0; // reset counter
    photoCapture.startCaptureSequence();
    countdown.startCountdown(() => captureNextPhoto(videoElement));
  }, [photoCapture, countdown, captureNextPhoto]);

  const resetSequence = useCallback(() => {
    photoCountRef.current = 0; // reset counter
    photoCapture.resetPhotos();
    countdown.resetCountdown();
  }, [photoCapture, countdown]);

  return {
    currentFilter,
    setCurrentFilter,
    
    countdown: countdown.countdown,
    isCountingDown: countdown.isActive,
    
    capturedPhotos: photoCapture.capturedPhotos,
    isCapturing: photoCapture.isCapturing,
    isSequenceComplete: photoCapture.isSequenceComplete,
    canvasRef: photoCapture.canvasRef,
    
    startSequence,
    resetSequence
  };
};