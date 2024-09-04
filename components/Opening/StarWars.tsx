"use client";
import React from "react";
import { motion } from "framer-motion";
const lines = [
  "Today marks the start of an exciting",
  "journey as I dive into a unique",
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
  },
};

const lineVariants = {
  hidden: { opacity: 0, scale: 5 },
  visible: {
    opacity: 1,
    scale: 3,
    transition: { duration: 5, ease: "linear" },
  },
};

export const StarWars = ({ onAnimationCompleteStarWars }: any) => {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          height: "100vh",
          color: "yellow",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontStyle: "normal",
        }}
      >
        <motion.div
          style={{
            textAlign: "center",
            fontSize: "2vw",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={onAnimationCompleteStarWars}
        >
          <motion.div variants={lineVariants} className="font-extrabold">
            CHANU WARS
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
