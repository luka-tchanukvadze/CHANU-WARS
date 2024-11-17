"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

const ChatHistory = ({ chatHistory }: { chatHistory: any[] }) => {
  return (
    <div className="space-y-4">
      {chatHistory.map((message: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-start p-4 rounded-lg ${
            message.type === "user"
              ? "bg-gray-800 bg-opacity-50 text-yellow-400"
              : "bg-yellow-400 bg-opacity-10 text-yellow-300"
          }`}
        >
          <div
            className={`mr-3 ${
              message.type === "user" ? "text-yellow-400" : "text-yellow-300"
            }`}
          >
            {message.type === "user" ? (
              <User className="w-6 h-6" />
            ) : (
              <Bot className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatHistory;
