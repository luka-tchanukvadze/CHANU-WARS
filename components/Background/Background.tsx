"use client";
import { useState, useEffect, memo } from "react";
import styles from "./Background.module.css";

interface Star {
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const Background: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      [...Array(100)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: Math.random() * 1 + 0.5,
      }))
    );
  }, []);

  return (
    <div className="fixed w-full bg-cover h-screen z-[-1]">
      <div className="min-h-screen bg-black overflow-hidden">
        <div className="fixed inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-yellow-300 rounded-full ${styles.star}`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Background);
