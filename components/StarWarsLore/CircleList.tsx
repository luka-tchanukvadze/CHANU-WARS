"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const items = [
  "The Jedi and the Force",
  "The Sith and the Dark Side",
  "The Galactic Conflict",
  "Iconic Characters",
  "Star Wars Lore",
  "Expanded Universe",
  "Spoilers and Theories",
  "Star Wars Gaming",
];

const CircleList = () => {
  const [radius, setRadius] = useState(
    Math.min(window.innerWidth, window.innerHeight) * 0.3
  );
  const [scattered, setScattered] = useState(false);
  const [randomPositions, setRandomPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window size on resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setRadius(Math.min(window.innerWidth, window.innerHeight) * 0.3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate random scatter positions within the viewport bounds with margins
  const generateRandomPositions = () => {
    const itemWidth = 200; // Approximate width of each item
    const itemHeight = 80; // Approximate height of each item
    const margin = 2; // 2px margin from edges

    const maxOffsetX = (windowSize.width - itemWidth - 2 * margin) / 2;
    const maxOffsetY = (windowSize.height - itemHeight - 2 * margin) / 2;

    return items.map(() => ({
      x: Math.random() * (maxOffsetX * 2) - maxOffsetX,
      y: Math.random() * (maxOffsetY * 2) - maxOffsetY,
    }));
  };

  // Set up interval to rescatter items every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomPositions(generateRandomPositions());
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [windowSize]); // Re-run if windowSize changes

  // Calculate initial circular positions
  const positions = useMemo(() => {
    return items.map((_, index) => {
      const angle = (index / items.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
  }, [items.length, radius]);

  // Framer motion variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      x: scattered ? randomPositions[index]?.x : positions[index]?.x,
      y: scattered ? randomPositions[index]?.y : positions[index]?.y,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.5,
      },
    }),
    hover: {
      scale: 1.2,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <div
      className="relative w-full min-h-screen flex justify-center items-center"
      style={{ overflow: "hidden" }}
      onMouseEnter={() => {
        setScattered(true);
        setRandomPositions(generateRandomPositions()); // Initial scatter on hover
      }} // Trigger scattering on hover
    >
      <motion.div
        style={{
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
          position: "relative",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.div
            key={item}
            variants={itemVariants}
            custom={index}
            whileHover="hover"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.8), 0 0 8px #00FF00", // Neon glow
              cursor: "pointer",
              fontSize: "1.2rem",
              backdropFilter: "blur(4px)",
              transition: "transform 0.2s ease",
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
            onClick={() => alert(`Clicked on: ${item}`)}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CircleList;
