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
            <div className="flex flex-col items-center max-w-[80%] md:max-w-[65%] lg:max-w-[46%] relative">
              <img src={gif} className="w-[50%] h-auto m-0 p-0 "/>
              <img src={yeuxcelesteslanding} className="w-[80%] h-auto m-0 p-0 -translate-x-2 md:-translate-x-4 lg:-translate-x-6"/>
              <button
                onClick={handleGetStarted} 
                className="absolute -bottom-2 md:-bottom-2 lg:-bottom-3 xl:-bottom-2 2xl:bottom-3 px-4 md:px-6 py-1 md:py-2.5 border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white rounded-full font-CooperHewitt text-[0.6rem] md:text-sm lg:text-sm font-medium text-white transition-all duration-1050 hover:shadow-[0_0_20px_rgba(255,208,0,5)]"
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