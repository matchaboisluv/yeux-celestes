import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import yeuxcelestes from '../assets/images/yeuxcelestes.png'

function LandingPage(){
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/photobooth');
    }

    return (
        <div className="min-h-screen flex flex-col w-full">
            <main className="flex-1 flex flex-col items-center justify-center relative">
                <div className="relative max-w-full md:max-w-[65%] lg:max-w-[46%] w-full">
                    <img src={yeuxcelestes} className="w-full h-auto object-contain z-0 animate-pulse brightness-150 contrast-105"/>
                    <button
                        onClick={handleGetStarted} 
                        className="opacity-[90%] absolute top-[52%] left-1/2 transform -translate-x-1/2 px-4 md:px-6 py-1 md:py-2.5 border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white rounded-full font-CooperHewitt text-[0.6rem] md:text-sm lg:text-sm font-medium text-white transition-all duration-1000 hover:bg-white hover:text-red-800 active:scale-95 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                    >
                        Begin Experience
                    </button>
                </div>
                
            </main>
            <Footer/>
        </div>
    )
}

export default LandingPage