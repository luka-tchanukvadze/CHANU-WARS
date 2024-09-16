"use client";

import { useState } from "react";

const ControlMusic = ({ audioStarted, audioRef }: any) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: any) => {
        console.error("Failed to play the audio:", error);
      });
      setIsPaused(false);
    }
  };
  return (
    <>
      {audioStarted && (
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
      )}
    </>
  );
};
export default ControlMusic;
