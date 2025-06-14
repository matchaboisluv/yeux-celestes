import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import yeuxcelestes2 from '../assets/images/yeuxcelestes2.png';
import Footer from '../components/Footer';
import { useCamera } from '../hooks/useCamera';
import { usePhotoSequence } from '../hooks/usePhotoSequence';
import { FILTERS, getFilterById } from '../utils/filters';

function PhotoboothPage() {
    const camera = useCamera();
    const photoSequence = usePhotoSequence(3);
    const canvasRef = useRef(null);

    const handleStartCapture = () => {
        if (camera.videoRef.current) {
            photoSequence.startSequence(camera.videoRef.current);
        }
    };

    const currentFilterStyle = getFilterById(photoSequence.currentFilter).cssFilter;

    return (
        <div className="flex flex-col min-h-screen w-full">
            <main className="flex-grow flex flex-col items-center justify-start relative pb-4 md:pb-6">
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
                        <div className="flex flex-row gap-4 lg:gap-8">
                            <div className="flex flex-col">
                                <div className="relative bg-black overflow-hidden w-full aspect-[4/3]">
                                    <video
                                        ref={camera.videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                        style={{ filter: currentFilterStyle }}
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
                                <div className="text-center mt-3 md:mt-6">
                                    <button
                                        onClick={handleStartCapture}
                                        disabled={
                                            !camera.stream ||
                                            photoSequence.isCapturing ||
                                            photoSequence.isSequenceComplete
                                        }
                                        className="mr-3 bg-transparent border-2 border-white text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-base lg:text-base xl:text-base font-medium hover:bg-white hover:text-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {photoSequence.isCapturing
                                            ? 'Capturing...'
                                            : photoSequence.isSequenceComplete
                                            ? 'Complete'
                                            : 'Capture'}
                                    </button>

                                    {photoSequence.capturedPhotos.length > 0 && (
                                        <button
                                            onClick={photoSequence.resetSequence}
                                            className="border-2 border-white text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-full font-CooperHewitt text-xs md:text-base lg:text-base xl:text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col items-center">
                                <h3 className="font-CooperHewitt text-xs md:text-base lg:text-lg xl:text-xl font-medium mb-2 md:mb-3 lg:mb-4">Filters</h3>
                                <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-4">
                                    {FILTERS.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => photoSequence.setCurrentFilter(filter.id)}
                                            className={`px-2 md:px-5 lg:px-8 py-1.5 md:py-2 lg:py-3 rounded-full border-2 font-CooperHewitt text-[0.5rem] md:text-xs lg:text-sm xl:text-base font-medium transition-all duration-300 whitespace-nowrap ${
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
            <Footer className="inset-x-0 bottom-0"/>
        </div>
    )
}

export default PhotoboothPage
