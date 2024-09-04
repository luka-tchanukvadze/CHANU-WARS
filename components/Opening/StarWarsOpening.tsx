"use client";
import React from "react";
import { motion } from "framer-motion";

// Split the text into lines, each with up to five words
// const text =
//   "an exciting full-stack project!, Inspired by Star Wars, 3 unique experiences:, 1. Explore the rich lore ofStar Wars with detailed explanations.,2. Shop for Star Wars themed,merchandise in an engaging online store.,3. Battle in space with our,ship fighting game!,This project aims to captivate Star Wars,fans and newcomers alike.,I hope it inspires you to,watch the series and dive into,the Star Wars universe!";

const lines = [
  "an exciting full-stack project!",
  "Inspired by Star Wars",
  "3 unique experiences:",
  "1. Explore the rich lore of",
  "Star Wars with detailed explanations.",
  "2. Shop for Star Wars themed",
  "merchandise in an engaging online store.",
  "3. Battle in space with our",
  "ship fighting game!",
  "This project aims to captivate Star Wars",
  "fans and newcomers alike.",
  "I hope it inspires you to",
  "watch the series and dive into",
  "the Star Wars universe!",
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Reduce time between each line appearing
    },
  },
};

const lineVariants = {
  hidden: { opacity: 1, y: "100vh", scale: 1.2 }, // Start below the viewport
  visible: {
    opacity: 0,
    y: "-60vh", // Move the text off the top of the viewport
    scale: 0.8, // Adjust scaling to create a receding effect
    transition: { duration: 25, ease: "linear" }, // Longer duration for slow scrolling
  },
};

function StarWarsOpening({ onAnimationComplete }: any) {
  return (
    <div
      style={{
        perspective: "600px", // Perspective to create depth
        overflow: "hidden",
        height: "100vh",
        color: "yellow",
        display: "flex",
        alignItems: "center", // Align text to start from bottom
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "20vh", // Increase padding to adjust text start point
      }}
    >
      <motion.div
        style={{
          // display: "flex",
          // alignItems: "center",
          textAlign: "center",
          transformStyle: "preserve-3d",
          transform: "rotateX(58deg)", // Tilt for the Star Wars effect
          width: "50%",
          fontSize: "calc(16px + 1vw)", // Responsive font size that scales with viewport width
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={onAnimationComplete}
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            style={{
              display: "block",
              maxWidth: "100%", // Ensure text doesn't overflow on small screens
            }}
          >
            {line}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default StarWarsOpening;

/*

//           variants={lineVariants}
//           style={{
//             lineHeight: "4rem", // Adjust margin for closer lines
//             maxWidth: "100%", // Ensure text doesn't overflow on small screens
//           }}
//         >
//           {text}
//         </motion.div>

*/
