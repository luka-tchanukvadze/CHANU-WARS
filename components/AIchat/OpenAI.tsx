"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import AIchat from "./AIchat";
import { motion } from "framer-motion";

const OpenAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-24 right-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className={`relative w-14 h-14 bg-gray-900 rounded-lg overflow-hidden border border-yellow-400 shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 flex items-center justify-center`}
        aria-label={isOpen ? "Close Galactic AI Chat" : "Open Galactic AI Chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-red-500" />
        ) : (
          <MessageCircle className="w-6 h-6 text-yellow-400" />
        )}
      </motion.button>
      {isOpen && <AIchat />}
    </div>
  );
};
export default OpenAI;
