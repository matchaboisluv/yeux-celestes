import React, { useRef, useState } from 'react';
import { Camera, Download } from 'lucide-react';
import yeuxcelestes2 from '../assets/images/yeuxcelestes2.png';
import Footer from '../components/Footer';
import { useCamera } from '../hooks/useCamera';
import { usePhotoSequence } from '../hooks/usePhotoSequence';
import { FILTERS, getFilterById } from '../utils/filters';
import ResultPage from './ResultPage';
import redcurtain from '../assets/images/redcurtain.png'

function PhotoboothPage() {
    const camera = useCamera();
    const photoSequence = usePhotoSequence(3);
    const canvasRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleStartCapture = () => {
        if (camera.videoRef.current) {
            photoSequence.startSequence(camera.videoRef.current);
        }
    };

    const currentFilterStyle = getFilterById(photoSequence.currentFilter).cssFilter;

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setShowResults(true);
            setIsTransitioning(false);
        }, 800);
    };

    const handleBackToPhotobooth = () => {
        setShowResults(false);
        photoSequence.resetSequence();
    };

    if (showResults) {
        return (
            <ResultPage 
                capturedPhotos={photoSequence.capturedPhotos}
                onBack={handleBackToPhotobooth}
            />
        );
    }

    return (
        
        <div className="min-h-screen flex flex-col w-full bg-black relative overflow-hidden" 
        >
            {isTransitioning && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="text-white font-CooperHewitt text-2xl animate-pulse">
                        Preparing your photos...
                    </div>
                </div>
            )}
            
            <main className="flex-1 flex flex-col items-center justify-center relative "> {/*pb-4 md:pb-6*/}
                {/* mt-[-8rem] sm:mt-[-10rem] md:mt-[-12rem] lg:mt-[-12rem] xl:mt-[-15rem] 2xl:mt-[-22rem] */}
                <canvas ref={photoSequence.canvasRef} className="hidden"/>

                {/* Banner Image */}
                {/* <div className="w-full flex justify-center">
                    <img
                        src={yeuxcelestes2}
                        alt="Yeux Celestes"
                        className="w-full object-contain md:max-w-[65%] lg:max-w-[46%]"
                    />
                </div> */}

                {/* Main Content */}
                <div className="w-[70%] max-w-[1600px] flex flex-row justify-center items-center px-5 ">
                    <div className="flex flex-col lg:flex-row items-start justify-center gap-2 lg:gap-2 w-full">

                        {/* Camera Section, Filters, Captured Photos */}
                        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row w-full gap-5">
                            
                            {/* Filters */}
                            <div className="flex flex-row md:flex-row lg:flex-col xl:flex-col justify-center lg:justify-start items-center mt-3">
                                {/* <h3 className="font-CooperHewitt text-xs md:text-base lg:text-lg xl:text-xl font-medium lg:mb-4 mr-4 md:mr-6 lg:mr-0">Filters</h3> */}
                                <div className="flex flex-row md:flex-row lg:flex-col xl:flex-col items-center justify-center space-x-2 md:space-x-4 lg:space-x-0 lg:space-y-4">
                                    {FILTERS.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => photoSequence.setCurrentFilter(filter.id)}
                                            className={`w-16 md:w-28 lg:w-32 py-1.5 md:py-2 lg:py-2 rounded-full font-CooperHewitt text-[0.5rem] md:text-xs lg:text-sm xl:text-sm font-medium transition-all duration-300 ${
                                                photoSequence.currentFilter === filter.id
                                                    ? 'text-white shadow-[0_0_10px_rgba(255,255,0,0.5)]'
                                                    : 'text-white'
                                            }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>

                            </div>

                            <div className="w-full lg:w-[72%]">
                                <div className="flex flex-col">
                                    <div className="relative bg-black w-full aspect-[4/3]">
                                        <video
                                            ref={camera.videoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover border-[1px] border-black"
                                            style={{ 
                                                filter: currentFilterStyle, 
                                                transform: 'scaleX(-1)'
                                            }}
                                        />

                                        {/* Camera Countdown */}
                                        {photoSequence.isCountingDown && photoSequence.countdown > 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <div className="text-9xl font-bold animate-pulse">
                                                    {photoSequence.countdown}
                                                </div>
                                            </div>
                                        )}

                                        {/* Camera Status Overlay */}
                                        {!camera.stream && (
                                            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                                                <div>
                                                    <Camera size={64} className="mx-auto mb-4 opacity-50"/>
                                                    <p>{camera.isLoading ? 'Loading camera...' : 'Camera not available'}</p>
                                                    {camera.error && (
                                                        <p className="text-sm mt-2 opacity-75">
                                                            Error: {camera.error.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Capture Controls */}
                                    <div className="text-center mt-3 md:mt-6 space-x-4">
                                        {/* While capturing */}
                                        {photoSequence.isCapturing && (
                                            <button
                                            disabled
                                            className="text-white px-4 md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium transition-all duration-300"
                                            >
                                            Capturing...
                                            </button>
                                        )}

                                        {/* Before capturing (initial state) */}
                                        {!photoSequence.isCapturing && !photoSequence.isSequenceComplete && (
                                            <button
                                            onClick={handleStartCapture}
                                            disabled={!camera.stream}
                                            className="text-white px-4 md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                            >
                                            Capture
                                            </button>
                                        )}

                                        {/* After capturing is complete */}
                                        {!photoSequence.isCapturing && photoSequence.isSequenceComplete && (
                                            <>
                                            <button
                                                onClick={photoSequence.resetSequence}
                                                className="text-white px-4 md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                            >
                                                Reset
                                            </button>

                                            <button
                                                onClick={handleNext}
                                                className="text-white px-4 md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                            >
                                                Next
                                            </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                             {/* <div className="block md:block lg:hidden">
                                <hr className="border-white border-t-[0.5px] w-full my-2 opacity-[20%]" />
                            </div> */}

                            {/* Captured Photos */}
                            <div className="w-full lg:w-[28%] xl:w-[22%] flex flex-col gap-7">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className="bg-black overflow-hidden aspect-[4/3]"
                                    >
                                        {photoSequence.capturedPhotos[index] ? (
                                        <img
                                            src={photoSequence.capturedPhotos[index]}
                                            alt={`Captured photo ${index + 1}`}
                                            className="w-full h-full object-cover opacity-0 animate-fade-in"
                                        />
                                        ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <p className="font-CooperHewitt text-xs">Photo {index + 1}</p>
                                        </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                    
            </main>
            {/* <Footer/> */}
        </div>
    )
}

export default PhotoboothPage
