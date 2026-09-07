"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import type { Turn } from "./types";

export default function ChatHistory({
  turns,
  streaming,
}: {
  turns: Turn[];
  streaming: boolean;
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {turns.map((turn, index) => {
        const isUser = turn.role === "user";
        const isLast = index === turns.length - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            // Fixed, not scaled by index: a delay per message makes a long
            // transcript crawl in one at a time.
            transition={{ duration: 0.2 }}
            className={`flex items-start p-2 sm:p-3 rounded-lg ${
              isUser
                ? "bg-gray-800 bg-opacity-50 text-yellow-400"
                : "bg-yellow-400 bg-opacity-10 text-yellow-300"
            }`}
          >
            <div className={`mr-2 sm:mr-3 shrink-0 ${isUser ? "text-yellow-400" : "text-yellow-300"}`}>
              {isUser ? (
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
            <div className="flex-1 text-sm sm:text-base break-words [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_code]:text-xs [&_code]:bg-black/40 [&_code]:px-1 [&_code]:rounded">
              <ReactMarkdown>{turn.content}</ReactMarkdown>
              {streaming && isLast && !isUser && (
                <span className="inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-yellow-300 animate-pulse" />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
