"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Trash2 } from "lucide-react";
import ChatHistory from "./ChatHistory";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIchat() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const myApi: string = process.env.NEXT_PUBLIC_GEMINI_API || "defaultApiKey";

  const genAI = new GoogleGenerativeAI(myApi);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    setError("");
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // setError((error as Error).message);
      setError(
        "Too many requests have been made. Please wait a few minutes and try again."
      );
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
      className="fixed bottom-40 right-4 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-15rem)] sm:h-[32rem] bg-gray-900 rounded-lg shadow-xl border border-yellow-400 flex flex-col overflow-hidden z-50"
    >
      <div className="p-3 sm:p-4 border-b border-yellow-400">
        <h2 className="text-base sm:text-lg font-semibold text-yellow-400">
          Galactic AI Chat
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-lg text-yellow-400 text-sm sm:text-base"
        >
          May the Force be with you!
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-700 bg-opacity-50 p-2 sm:p-3 rounded-lg text-yellow-400 text-right text-sm sm:text-base"
        >
          And also with you, young Padawan.
        </motion.div>

        <ChatHistory chatHistory={chatHistory} />

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center"
          >
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-3 sm:mt-4 text-center text-sm sm:text-base"
          >
            {error}
          </motion.div>
        )}
      </div>

      <div className="p-3 sm:p-4 border-t border-yellow-400 space-y-3 sm:space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-red-600 text-white focus:outline-none transition-colors duration-200 flex items-center justify-center text-sm sm:text-base ${
            isClearDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-700"
          }`}
          onClick={clearChat}
          disabled={isClearDisabled}
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Clear Chat
        </motion.button>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-3 sm:px-4 py-2 rounded-lg border border-yellow-400 bg-black bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-yellow-400 placeholder-yellow-600 text-sm sm:text-base"
            placeholder="Ex: What is the force? ... "
            value={userInput}
            onChange={handleUserInput}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 sm:px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 focus:outline-none transition-colors duration-200 flex items-center justify-center"
            onClick={sendMessage}
            disabled={isLoading}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
