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
                    <img src={yeuxcelestes} className="w-full h-auto object-contain z-0"/>
                    <button
                        onClick={handleGetStarted} 
                        className="absolute top-[52%] left-1/2 transform -translate-x-1/2 px-4 py-2 md:px-6 md:py-2.5 border-2 border-white rounded-full font-CooperHewitt text-[0.6rem] md:text-sm lg:text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-red-800 active:scale-95"
                    >
                        Get Started
                    </button>
                </div>
                
            </main>
            <Footer/>
        </div>
    )
}

export default LandingPage