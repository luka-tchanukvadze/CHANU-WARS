"use client";
import React, { useState, useRef } from "react";
import HomePage from "@/components/HomePage/HomePage";
import Opening from "@/components/Opening/Opening";
import Music from "@/components/Music/Music";

export default function Home() {
  const [showHomePage, setShowHomePage] = useState<boolean>(false);
  const [audioStarted, setAudioStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play the audio:", error);
      });
      setAudioStarted(true);
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play the audio:", error);
      });
      setIsPaused(false);
    }
  };

  return (
    <>
      <Music audioRef={audioRef} />

      {/* {!audioStarted ? (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={handleStartAudio}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Music
          </button>
        </div>
      ) : !showHomePage ? (
        <Opening onAnimationComplete={() => setShowHomePage(true)} />
      ) : (
        <HomePage />
      )} */}

      {/* Music control buttons */}
      {/* {audioStarted && (
        <div className="absolute top-4 right-4 flex gap-2">
          {isPaused ? (
            <button
              onClick={handleResumeAudio}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Resume
            </button>
          ) : (
            <button
              onClick={handlePauseAudio}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Pause
            </button>
          )}
        </div>
      )} */}

      <HomePage />
    </>
  );
}
