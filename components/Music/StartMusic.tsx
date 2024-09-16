"use cient";
// import { useAudioContext } from "@/context/audio-context";
import { useState, useRef } from "react";

const StartMusic = ({ audioRef, audioStarted, setAudioStarted }: any) => {
  // const { audioStarted, setAudioStarted } = useAudioContext();
  // const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleStartAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: any) => {
        console.error("Failed to play the audio:", error);
      });
      setAudioStarted(true);
    }
  };

  // const handlePauseAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     setIsPaused(true);
  //   }
  // };

  // const handleResumeAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play().catch((error: any) => {
  //       console.error("Failed to play the audio:", error);
  //     });
  //     setIsPaused(false);
  //   }
  // };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={handleStartAudio}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Music
        </button>
      </div>

      <div className="text-white">heeeyyyyy</div>
    </>
  );
};
export default StartMusic;
