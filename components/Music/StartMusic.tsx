"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

const StartMusic = ({ audioRef, audioStarted, setAudioStarted }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  const handleStartAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: any) => {
        console.error("Failed to play the audio:", error);
      });
      setAudioStarted(true);
    }
  };

  useEffect(() => {
    animate([
      [
        scope.current,
        { scale: [0, 1.2, 1] },
        { duration: 0.5, ease: "easeInOut" },
      ],
      [".glow", { opacity: [0, 0.5] }, { duration: 0.3, at: 0.2 }],
      [".pulse", { opacity: [0, 0.5] }, { duration: 0.3, at: 0.4 }],
      [
        ".button-text",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.3, at: 0.5 },
      ],
    ]);
  }, [animate, scope]);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.button
        ref={scope}
        onClick={handleStartAudio}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-8 py-4 bg-transparent text-yellow-400 text-2xl font-bold rounded-full overflow-hidden border-2 border-yellow-400 hover:text-black transition-colors duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{ originX: 0, originY: 0 }}
        />
        <span className="button-text relative z-10">Unleash the Force</span>
        <motion.div
          className="glow absolute inset-0 opacity-75"
          animate={{
            boxShadow: isHovered
              ? "0 0 20px 10px rgba(250, 204, 21, 0.7)"
              : "0 0 0px 0px rgba(250, 204, 21, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="pulse absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-yellow-400"
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
};

export default StartMusic;
