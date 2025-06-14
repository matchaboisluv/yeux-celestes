import { useState, useRef, useCallback } from 'react';
import { capturePhotoFromVideo } from '../utils/camera';
import { getFilterById } from '../utils/filters';

export const usePhotoCapture = (maxPhotos = 3) => {
  const canvasRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const capturePhoto = useCallback((videoElement, filterId = 'none') => {
    const filter = getFilterById(filterId);
    const photoDataUrl = capturePhotoFromVideo(
      videoElement, 
      canvasRef.current, 
      filter.cssFilter
    );
    
    if (photoDataUrl) {
      setCapturedPhotos(prev => [...prev, photoDataUrl]);
      return photoDataUrl;
    }
    return null;
  }, []);

  const startCaptureSequence = useCallback(() => {
    setCapturedPhotos([]);
    setIsCapturing(true);
  }, []);

  const stopCaptureSequence = useCallback(() => {
    setIsCapturing(false);
  }, []);

  const resetPhotos = useCallback(() => {
    setCapturedPhotos([]);
    setIsCapturing(false);
  }, []);

  const isSequenceComplete = capturedPhotos.length >= maxPhotos;

  return {
    canvasRef,
    capturedPhotos,
    isCapturing,
    isSequenceComplete,
    capturePhoto,
    startCaptureSequence,
    stopCaptureSequence,
    resetPhotos
  };
};