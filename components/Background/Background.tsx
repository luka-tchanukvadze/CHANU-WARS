"use client";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";

interface Star {
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const Background: React.FC = () => {
  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return [...Array(100)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: Math.random() * 1 + 0.5,
      }));
    };

    setStars(generateStars());
  }, []);

  return (
    <div className="fixed w-full bg-cover h-screen z-[-1]">
      <div className="min-h-screen bg-black overflow-hidden">
        <div className="fixed inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              variants={starVariants}
              initial="hidden"
              animate="show"
              transition={{
                delay: star.delay,
                duration: star.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                top: star.top,
                left: star.left,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Background);
