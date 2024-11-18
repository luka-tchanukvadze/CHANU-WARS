"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export default function ChatHistory({ chatHistory }: { chatHistory: any[] }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {chatHistory.map((message: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-start p-2 sm:p-3 rounded-lg ${
            message.type === "user"
              ? "bg-gray-800 bg-opacity-50 text-yellow-400"
              : "bg-yellow-400 bg-opacity-10 text-yellow-300"
          }`}
        >
          <div
            className={`mr-2 sm:mr-3 ${
              message.type === "user" ? "text-yellow-400" : "text-yellow-300"
            }`}
          >
            {message.type === "user" ? (
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          <div className="flex-1 text-sm sm:text-base">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
