"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Trash2 } from "lucide-react";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

export default function AIchat() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    setError("");
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulating error response
      throw new Error(
        "Too many API requests made. AI chat will be available after a short time."
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setError((error as Error).message);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setError("");
  };

  let isClearDisabled = chatHistory.length === 0 && !error;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-40 right-4 w-96 h-[32rem] bg-gray-900 rounded-lg shadow-xl border border-yellow-400 flex flex-col overflow-hidden z-50"
    >
      <div className="p-4 border-b border-yellow-400">
        <h2 className="text-lg font-semibold text-yellow-400">
          Galactic AI Chat
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 bg-opacity-50 p-3 rounded-lg text-yellow-400"
        >
          May the Force be with you!
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-700 bg-opacity-50 p-3 rounded-lg text-yellow-400 text-right"
        >
          And also with you, young Padawan.
        </motion.div>

        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 text-center"
          >
            {error}
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-yellow-400 space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full px-4 py-2 rounded-lg bg-red-600 text-white focus:outline-none transition-colors duration-200 flex items-center justify-center ${
            isClearDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-700"
          }`}
          onClick={clearChat}
          disabled={isClearDisabled}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Clear Chat
        </motion.button>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-yellow-400 bg-black bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-yellow-400 placeholder-yellow-600"
            placeholder="Ex: What is the force? ... "
            value={userInput}
            onChange={handleUserInput}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 focus:outline-none transition-colors duration-200 flex items-center justify-center"
            onClick={sendMessage}
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
