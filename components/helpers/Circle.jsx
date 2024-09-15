import React, { useState, useEffect } from "react";
import startSpeechRecognition from '@/components/helpers/speechRecognition';

const Circle = () => {
    const [frequency, setFrequency] = useState(2); // Animation frequency in seconds
    const [size, setSize] = useState(21); // Size of the blob

    useEffect(() => {
        // Start speech recognition
        startSpeechRecognition(
            (transcription) => {
                console.log("Transcribed Text: ", transcription);
            },
            () => {
                // When words are spoken, increase the size and speed of animation
                console.log("Word spoken detected");
                setSize(prevSize => {
                    const newSize = Math.min(prevSize + 10, 200);
                    console.log("Updated size:", newSize);
                    return newSize;
                });
                setFrequency(prevFrequency => {
                    const newFrequency = Math.max(prevFrequency - 0.2, 0.5);
                    console.log("Updated frequency:", newFrequency);
                    return newFrequency;
                });
            }
        );
    }, []);

    return (
        <div>
            <div
                className="blob"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: '#5eb575',
                    position: 'absolute',
                    top: '5.7%',
                    left: '18.3%',
                    transform: 'translate(-50%, -50%)',
                    animation: `blobPulse ${frequency}s infinite ease-in-out`,
                    transition: 'width 0.3s, height 0.3s',
                }}
            />
            {/* CSS-in-JS for the blob animation */}
            <style jsx>{`
                @keyframes blobPulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Circle;
