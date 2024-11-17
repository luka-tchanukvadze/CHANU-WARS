"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center mt-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full"
      />
      <span className="ml-2 text-yellow-400">Transmitting...</span>
    </motion.div>
  );
};

export default Loading;
