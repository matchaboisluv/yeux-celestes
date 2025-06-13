import React from 'react'
import Footer from '../components/Footer'
import yeuxcelestes from '../assets/images/yeuxcelestes.png'

function LandingPage(){
    return (
        <div className="flex flex-col min-h-screen w-full">
            <main className="flex-grow flex flex-col items-center justify-center relative">
                <div className="relative max-w-full md:max-w-[65%] lg:max-w-[46%] w-full">
                    <img src={yeuxcelestes} className="w-full h-auto object-contain z-0"/>
                    <button className="absolute top-[52%] left-1/2 transform -translate-x-1/2 px-4 py-1 border-2 border-white rounded-3xl hover:bg-white hover:text-[#640000] font-CooperHewitt text-[0.6rem] md:text-sm lg:text-md">
                        Get Started
                    </button>
                </div>
                
            </main>
            <Footer className="inset-x-0 bottom-0"/>
        </div>
    )
}

export default LandingPage