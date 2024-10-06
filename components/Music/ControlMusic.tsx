"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const ControlMusic = ({ audioStarted, audioRef }: any) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (audioStarted) {
      setIsVisible(true);
    }
  }, [audioStarted]);

  const handleToggleAudio = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play().catch((error: any) => {
          console.error("Failed to play the audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <motion.button
            onClick={handleToggleAudio}
            className="relative w-14 h-14 bg-gray-900 rounded-lg overflow-hidden border border-yellow-400 shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-yellow-400"
              initial={{ scale: 0 }}
              animate={{ scale: isPaused ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center w-full h-full">
              {isPaused ? (
                <Volume2 className="w-6 h-6 text-yellow-400" />
              ) : (
                <VolumeX className="w-6 h-6 text-gray-900" />
              )}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ControlMusic;
