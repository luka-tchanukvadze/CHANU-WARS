"use client";
import React, { useState, useEffect, useRef } from "react";
import HomePage from "@/components/HomePage/HomePage";
import Opening from "@/components/Opening/Opening";
import Music from "@/components/Music/Music";

export default function Home() {
  const [showHomePage, setShowHomePage] = useState<boolean>(false);

  const [audioStarted, setAudioStarted] = useState<boolean>(false); // Track audio start state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play the audio:", error);
      });
      setAudioStarted(true); // Update state to indicate audio has started
    }
  };

  return (
    <>
      <Music audioRef={audioRef} />

      {/* Start button to trigger audio and show main content */}
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
      <HomePage />
    </>
  );
}
