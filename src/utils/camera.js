export const initializeCamera = async (constraints = { video: {width: 640, height: 480}}) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return { stream, error: null };
    } catch (error) {
        console.error('Error accessing camera: ', error);
        return { stream: null, error };
    }
};

export const stopCameraStream = (stream) => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

export const capturePhotoFromVideo = (videoElement, canvasElement, filter = 'none') => {
  if (!videoElement || !canvasElement) return null;

  const canvas = canvasElement;
  const video = videoElement;
  const ctx = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.save();

  // apply filter
  ctx.filter = filter;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  ctx.restore();
  
  return canvas.toDataURL('image/png');
};
