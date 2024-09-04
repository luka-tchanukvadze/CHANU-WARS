"use client";
import React, { useState, useEffect, useRef } from "react";
import HomePage from "@/components/HomePage/HomePage";
import StarWarsOpening from "@/components/Opening/StarWarsOpening";
import Opening from "@/components/Opening/Opening";
import { Howl } from "howler";

const backgroundMusicUrl =
  "https://ia803204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3";

// https://4kwallpapers.com/images/wallpapers/stars-galaxy-3440x1440-10307.jpg

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
      {/* Background audio element */}
      <audio ref={audioRef} src={backgroundMusicUrl} loop hidden />

      <div
        className={`absolute w-full bg-cover h-screen bg-[url("https://4kwallpapers.com/images/wallpapers/stars-galaxy-3440x1440-10307.jpg")] z-[-1]`}
      ></div>

      {/* Start button to trigger audio and show main content */}
      {!audioStarted ? (
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
      )}
    </>
  );
}
