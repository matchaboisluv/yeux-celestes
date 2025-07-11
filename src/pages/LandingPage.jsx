import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import yeuxcelestes from '../assets/images/yeuxcelestes.png'
import redcurtain from '../assets/images/redcurtain.png'
import gif from '../assets/images/gif.gif'
import yeuxcelesteslanding from '../assets/images/yeuxcelesteslanding.png'
import glow from '../assets/images/glow.png'

function LandingPage(){
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/photobooth');
    }

    return (
        <div className="min-h-screen flex flex-col w-full bg-cover bg-center relative overflow-hidden" 
              style={{ backgroundImage: `url(${redcurtain})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <img
              src={glow}
              alt="glow"
              className="w-[300px] md:w-[400px] lg:w-[60%] h-auto object-contain animate-pulse brightness-150 contrast-105"
            />
          </div>

          <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
            <div className="flex flex-col items-center max-w-[90%] md:max-w-[75%] lg:max-w-[55%] relative">
              <img src={gif} className="w-[70%] md:w-[60%] lg:w-[65%] xl:w-[60%] 2xl:w-[40%] h-auto mb-2 pl-5"/>
              <img src={yeuxcelesteslanding} className="w-full md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[70%] h-auto m-0 pl-5 -translate-x-3.5 md:-translate-x-5 lg:-translate-x-5 xl:-translate-x-6 2xl:-translate-x-10"/>
              <button
                onClick={handleGetStarted} 
                className="absolute -bottom-1.5 md:-bottom-3 lg:-bottom-2 xl:-bottom-2 2xl:bottom-4 px-3.5 md:px-7 py-1 md:py-2 border-[1px] md:border-[1px] lg:border-1 xl:border-1 border-white rounded-full font-CooperHewitt text-[0.6rem] md:text-[0.85rem] lg:text-[0.9rem] text-white transition-all duration-1050 hover:shadow-[0_0_10px_rgba(255,208,0,5)]"
              >
                Begin Experience →
              </button>
            </div>
                
          </main>
          {/* <Footer/> */}
        </div>
    )
}

export default LandingPage