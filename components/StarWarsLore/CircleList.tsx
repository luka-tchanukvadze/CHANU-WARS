"use client";
import React, { useMemo } from "react";
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

const duration = 16; // Duration of the circular movement

const CircleList = () => {
  // Calculate the radius based on viewport width and height
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3; // Adjust as needed

  // Memoize the positions to avoid recalculating on every render
  const positions = useMemo(() => {
    return items.map((_, index) => {
      const angle = (index / items.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
  }, [items.length, radius]);

  const containerVariants: any = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 2, // Stagger the start of each item
      },
    },
  };

  const itemVariants: any = {
    hidden: (index: number) => positions[index],
    visible: {
      x: [0, radius, 0, -radius, 0], // Circular movement
      y: [radius, 0, -radius, 0, radius], // Circular movement
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    },
  };

  return (
    <div
      className="relative w-full h-full flex justify-center items-center "
      style={{ overflow: "hidden" }}
    >
      <motion.div
        style={{ width: `${2 * radius}px`, height: `${2 * radius}px` }} // Set the size of the container to fit the circle
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.div
            key={item}
            variants={itemVariants}
            custom={index} // Pass the index as a custom prop to use in variants
            style={{
              position: "absolute",
              top: "50%",
              left: "25%",
              right: "25%",
              bottom: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              borderRadius: "8px",
              backgroundColor: "rgb(207, 180, 180)",
              boxShadow: "0 4px 6px rgba(243, 223, 223, 0.861)",
              cursor: "pointer",
              fontSize: "calc(10px + 1vw)",
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
