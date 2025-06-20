import React, { useRef, useState } from 'react';
import { Camera, Download } from 'lucide-react';
import yeuxcelestes2 from '../assets/images/yeuxcelestes2.png';
import Footer from '../components/Footer';
import { useCamera } from '../hooks/useCamera';
import { usePhotoSequence } from '../hooks/usePhotoSequence';
import { FILTERS, getFilterById } from '../utils/filters';
import ResultPage from './ResultPage';

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
        
        <div className="min-h-screen flex flex-col">
            {isTransitioning && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="text-white font-CooperHewitt text-2xl animate-pulse">
                        Preparing your photos...
                    </div>
                </div>
            )}
            
            <main className="flex-1 flex flex-col items-center justify-start relative pb-4 md:pb-6">
                <canvas ref={photoSequence.canvasRef} className="hidden"/>

                {/* Banner Image */}
                <div className="w-full flex justify-center">
                    <img
                        src={yeuxcelestes2}
                        alt="Yeux Celestes"
                        className="w-full object-contain md:max-w-[65%] lg:max-w-[46%]"
                    />
                </div>

                {/* Main Content */}
                <div className="w-[90%] flex items-center justify-center flex-row px-10 mt-[-8rem] sm:mt-[-10rem] md:mt-[-12rem] lg:mt-[-12rem] xl:mt-[-15rem] 2xl:mt-[-22rem]">
                    <div className="flex flex-col items-center lg:flex-row gap-10 lg:gap-24 items-start">

                        {/* Camera Section & Filters */}
                        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-4 lg:gap-8">
                            <div className="flex flex-col">
                                <div className="relative border-black bg-black overflow-hidden w-full aspect-[4/3]">
                                    <video
                                        ref={camera.videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
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
                                        className="bg-transparent border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium opacity-70 cursor-wait"
                                        >
                                        Capturing...
                                        </button>
                                    )}

                                    {/* Before capturing (initial state) */}
                                    {!photoSequence.isCapturing && !photoSequence.isSequenceComplete && (
                                        <button
                                        onClick={handleStartCapture}
                                        disabled={!camera.stream}
                                        className="bg-transparent border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium hover:bg-white hover:text-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                        >
                                        Capture
                                        </button>
                                    )}

                                    {/* After capturing is complete */}
                                    {!photoSequence.isCapturing && photoSequence.isSequenceComplete && (
                                        <>
                                        <button
                                            onClick={photoSequence.resetSequence}
                                            className="border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            className="bg-white text-red-800 border-[1px] md:border-[1px] lg:border-2 xl:border-2 border-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-sm lg:text-base xl:text-base font-medium hover:bg-red-800 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                                        >
                                            Next
                                        </button>
                                        </>
                                    )}
                                </div>
                            </div>

                             <div className="block md:block lg:hidden">
                                <hr className="border-white border-t-[0.5px] w-full my-2 opacity-[20%]" />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-row md:flex-row lg:flex-col xl:flex-col justify-center lg:justify-start items-center">
                                <h3 className="font-CooperHewitt text-xs md:text-base lg:text-lg xl:text-xl font-medium lg:mb-4 mr-4 md:mr-6 lg:mr-0">Filters</h3>
                                <div className="flex flex-row md:flex-row lg:flex-col xl:flex-col items-center justify-center space-x-2 md:space-x-4 lg:space-x-0 lg:space-y-4">
                                    {FILTERS.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => photoSequence.setCurrentFilter(filter.id)}
                                            className={`w-16 md:w-28 lg:w-32 py-1.5 md:py-2 lg:py-3 rounded-full border-[1px] md:border-[1px] lg:border-2 xl:border-2 font-CooperHewitt text-[0.5rem] md:text-xs lg:text-sm xl:text-sm font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,0,0.5)] ${
                                                photoSequence.currentFilter === filter.id
                                                    ? 'bg-white text-red-800 border-white'
                                                    : 'bg-transparent text-white hover:bg-white hover:text-red-800 border-white'
                                            }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Captured Photos */}
                        <div className="flex flex-col space-y-4 w-[60%] lg:w-64">
                            {[0, 1, 2].map((index) => (
                                <div
                                    key={index}
                                    className="bg-black overflow-hidden aspect-[4/3]"
                                >
                                    {photoSequence.capturedPhotos[index] ? (
                                        <img
                                            src={photoSequence.capturedPhotos[index]}
                                            alt={`Captured photo ${index + 1}`}
                                            className="w-full h-full object-cover"
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
            </main>
            <Footer/>
        </div>
    )
}

export default PhotoboothPage
