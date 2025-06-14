import { useState, useRef, useEffect, useCallback } from 'react';
import { initializeCamera, stopCameraStream } from '../utils/camera';

export const useCamera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const { stream: newStream, error: cameraError } = await initializeCamera();
    
    if (newStream) {
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } else {
      setError(cameraError);
    }
    
    setIsLoading(false);
  }, []);

  const stopCamera = useCallback(() => {
    stopCameraStream(stream);
    setStream(null);
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera]);

  // update video stream when it changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return {
    videoRef,
    stream,
    isLoading,
    error,
    startCamera,
    stopCamera
  };
};