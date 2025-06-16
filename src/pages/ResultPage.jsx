import React, { useRef } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import yeuxcelestes2 from '../assets/images/yeuxcelestes2.png'
import yeuxcelestessign from '../assets/images/yeuxcelestessign.png'
import Footer from '../components/Footer';

function ResultPage({ capturedPhotos = [], onBack }){
    const stripRef = useRef(null);
    
    const currentDate = new Date().toLocaleDateString('en-PH', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const processImage = (imageSrc) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // always use 4:3 aspect ratio for consistent output
          const targetWidth = 400;
          const targetHeight = 300;
          
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          // calculate dimensions to fit image while maintaining aspect ratio
          const imgAspect = img.width / img.height;
          const targetAspect = targetWidth / targetHeight;
          
          let drawWidth, drawHeight, drawX, drawY;
          
          if (imgAspect > targetAspect) {
            // image is wider - fit by height
            drawHeight = targetHeight;
            drawWidth = drawHeight * imgAspect;
            drawX = (targetWidth - drawWidth) / 2;
            drawY = 0;
          } else {
            // image is taller - fit by width
            drawWidth = targetWidth;
            drawHeight = drawWidth / imgAspect;
            drawX = 0;
            drawY = (targetHeight - drawHeight) / 2;
          }
          
          // mirror the image horizontally and draw it
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(img, -drawX - drawWidth, drawY, drawWidth, drawHeight);
          ctx.restore();
          
          resolve(canvas.toDataURL());
        };
        
        img.onerror = () => {
          console.error('Failed to load image for processing');
          resolve(imageSrc); // return original if processing fails
        };
        
        img.src = imageSrc;
      });
    };

    const handleSave = async () => {
      if (!stripRef.current || capturedPhotos.length === 0) return;
      
      try {
        const processedPhotos = await Promise.all(
          capturedPhotos.map(photo => processImage(photo))
        );
        
        // canvas to combine all elements
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
      
        // canvas size for script
        const stripWidth = 250;
        const stripHeight = 620;
        const scale = 2; // scale to make the downloaded photo bigger for better quality

        canvas.width = stripWidth * scale;
        canvas.height = stripHeight * scale;

        ctx.scale(scale, scale);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, stripWidth, stripHeight);
        
        const padding = 12;
        const photoWidth = stripWidth - (padding * 2);
        const photoHeight = photoWidth * (3/4); // 4:3 aspect ratio
        const photoX = padding;
        const spacing = 12;
        let currentY = padding;
        
        const loadImage = (src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (error) => {
              console.error('Failed to load image:', src, error);
              reject(error);
            };
            img.src = src;
          });
        };
      
        // draw all 3 photo slots (filled or empty)
        for (let i = 0; i < 3; i++) {
          if (i < processedPhotos.length) {
            try {
              const img = await loadImage(processedPhotos[i]);
              ctx.drawImage(img, photoX, currentY, photoWidth, photoHeight);
            } catch (error) {
              console.error(`Failed to load photo ${i + 1}:`, error);
              // empty slot as fallback
              ctx.fillStyle = '#e5e5e5';
              ctx.fillRect(photoX, currentY, photoWidth, photoHeight);
            }
          } else {
            // empty slot
            ctx.fillStyle = '#e5e5e5';
            ctx.fillRect(photoX, currentY, photoWidth, photoHeight);
            
            // placeholder text
            ctx.fillStyle = '#999999';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Photo ${i + 1}`, stripWidth / 2, currentY + photoHeight / 2);
          }
          currentY += photoHeight + spacing;
        }
      
        try {
          const logoImg = await loadImage(yeuxcelestessign);
          const logoWidth = photoWidth * 0.7; // 70% of photo width to match the visual
          const logoHeight = logoImg.height * (logoWidth / logoImg.width); // maintain aspect ratio
          const logoX = (stripWidth - logoWidth) / 2;
          const logoY = currentY - 30; // position after photos
          
          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
          
          // date text below the logo
          ctx.fillStyle = 'black';
          ctx.font = 'bold 8px CooperHewitt';
          ctx.textAlign = 'center';
          ctx.fillText(currentDate, stripWidth / 2, logoY + logoHeight - 14);
        
        } catch (error) {
          console.error('Failed to load logo image:', error);
          // fallback: draw text instead of image
          ctx.fillStyle = 'black';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('YEUX CELESTES', stripWidth / 2, currentY + 30);
          
          // add date text below the fallback text
          ctx.font = 'bold 8px Arial';
          ctx.fillText(currentDate, stripWidth / 2, currentY + 50);
        }
      
        // download the image
        const link = document.createElement('a');
        link.download = `yeux-celestes-photobooth.png`;
        link.href = canvas.toDataURL();
        link.click();
        
      } catch (error) {
        console.error('Error saving image:', error);
      }
    };

    return (
        <div className="min-h-screen flex flex-col">
              
          <main className="flex-1 flex flex-col items-center">
          
            {/* Banner */}
            <div className="w-full flex justify-center top-0">
              <img
                src={yeuxcelestes2}
                alt="Yeux Celestes"
                className="w-full object-contain md:max-w-[65%] lg:max-w-[46%]"
              />
            </div>

            {/* Photo Strip */}
            <div 
              ref={stripRef}
              className="bg-white p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 mt-[-8rem] sm:mt-[-12rem] md:mt-[-14rem] lg:mt-[-14rem] xl:mt-[-18rem] 2xl:mt-[-24rem]"
              style={{ width: '250px', minHeight: '600px' }}
            >
              {/* Photos */}
              <div className="space-y-3">
                {capturedPhotos.map((photo, index) => (
                  <div key={index} className="w-full aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        transform: 'scaleX(-1)'
                      }}
                    />
                  </div>
                ))}
                  
                {/* Fill empty slots if less than 3 photos */}
                {Array.from({ length: 3 - capturedPhotos.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Photo {capturedPhotos.length + index + 1}</span>
                  </div>
                ))}
              </div>
              
              {/* Bottom text */}
              <div className="flex flex-col items-center justify-center flex flex-col -mt-4 mb-3">
                <div className="w-[70%]">
                  <img src= {yeuxcelestessign}/>
                </div>
                <div className="font-CooperHewitt text-[0.5rem] text-black font-medium -mt-6">
                  {currentDate}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button
                onClick={handleSave}
                disabled={capturedPhotos.length === 0}
                className="bg-transparent border-2 border-white text-white px-8 py-2 rounded-full font-medium hover:bg-white hover:text-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Download size={20}/>
                  Save
              </button>
            </div>     
        
          </main>

          <Footer/>

        </div>
    )
}

export default ResultPage