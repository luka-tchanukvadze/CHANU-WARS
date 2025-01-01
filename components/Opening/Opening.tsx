"use client";
import React, { useEffect, useState } from "react";
import { StarWars } from "./StarWars";
import StarWarsOpening from "./StarWarsOpening";
import { AnimatePresence, motion } from "framer-motion";
const Opening = ({ onAnimationComplete }: any) => {
  const [showOpeningText, setShowOpeningText] = useState<boolean>(false);
  const [time, setTime] = useState<number>(5);
  console.log(time);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdown);
  }, []);

  return (
    <>
      {!showOpeningText ? (
        <div className="relative">
          <StarWars
            onAnimationCompleteStarWars={() => setShowOpeningText(true)}
          />
          <motion.div
            className="absolute left-4 bottom-4 p-2 flex items-center gap-2 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg text-sm md:text-base lg:text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="">Skip in</span>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={time}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                {time}
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                ></motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        <StarWarsOpening onAnimationComplete={onAnimationComplete} />
      )}
    </>
  );
};

export default Opening;
