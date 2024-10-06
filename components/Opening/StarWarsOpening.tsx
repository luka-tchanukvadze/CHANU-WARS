"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const lines = [
  "A legendary full-stack journey!",
  "Fueled by Star Wars.",
  "Three epic experiences await:",
  "1. Explore the galaxy's secrets.",
  "2. Gear up, shop now.",
  "3. Engage in starship battles.",
  "This is for everyone.",
  "Fans and newcomers unite.",
  "Get inspired, dive in.",
  "Watch the saga,",
  "Explore the universe!",
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 1, y: "100vh", scale: 1.2 },
  visible: {
    opacity: 0,
    y: "-60vh",
    scale: 0.8,
    transition: { duration: 15, ease: "linear" },
  },
};

interface StarWarsOpeningProps {
  onAnimationComplete?: () => void;
}

export default function StarWarsOpening({
  onAnimationComplete,
}: StarWarsOpeningProps) {
  const controls = useAnimation();
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    controls.start("visible").then(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [controls, onAnimationComplete]);

  return (
    <div
      style={{
        perspective: "600px",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        color: "#FFE81F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "20vh",
      }}
    >
      <motion.div
        style={{
          textAlign: "center",
          transformStyle: "preserve-3d",
          transform: "rotateX(58deg)",
          width: windowDimensions.width < 768 ? "80%" : "50%",
          fontSize: `calc(${
            windowDimensions.width < 768 ? "14px" : "16px"
          } + 1vw)`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            style={{
              display: "block",
              maxWidth: "100%",
              marginBottom: `${windowDimensions.height * 0.02}px`,
            }}
          >
            {line}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
