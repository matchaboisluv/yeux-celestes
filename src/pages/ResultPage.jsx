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

    const handleSave = async () => {
      if (!stripRef.current || capturedPhotos.length === 0) return;
      
      try {
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
          if (i < capturedPhotos.length) {
            try {
              const img = await loadImage(capturedPhotos[i]);
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
        <div className="flex flex-col min-h-screen w-full">
              
          <main className="flex flex-col items-center flex-grow">
          
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

          <Footer className="inset-x-0 bottom-0"/>

        </div>
    )
}

export default ResultPage