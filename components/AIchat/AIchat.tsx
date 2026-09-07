"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Square, Trash2 } from "lucide-react";
import ChatHistory from "./ChatHistory";
import type { Turn } from "./types";

const CONTACT_URL = "https://www.linkedin.com/in/luka-tchanukvadze-600211257";

// Failures the maintainer has to fix. Everything else is the visitor's own
// doing, and asking them to report their own rate limiting only teaches them
// to ignore the message.
const OUTAGE_CODES = new Set([
  "not_configured",
  "model_retired",
  "circuit_open",
  "bad_key",
  "upstream",
  "timeout",
  "empty_answer",
  // The provider's quota, not this visitor's, so slowing down will not help.
  "upstream_rate_limited",
]);

const SUGGESTIONS = ["What is the Force?"];

export default function AIchat() {
  const [userInput, setUserInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Follow the answer as it is written, rather than leaving the reader to
  // chase it down the panel themselves.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns, isStreaming, error]);

  useEffect(() => {
    inputRef.current?.focus();

    // A pending request outlives the panel being closed unless it is cut here,
    // and its stream would then write into a component nobody is looking at.
    return () => abortRef.current?.abort();
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();

      if (!question || isStreaming) return;

      const history = turns;

      setUserInput("");
      setError("");
      setErrorCode("");
      setIsStreaming(true);
      // The empty assistant turn is the bubble the stream fills in.
      setTurns([
        ...history,
        { role: "user", content: question },
        { role: "assistant", content: "" },
      ]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // History goes with the question, so a follow up like "and his
          // master?" resolves against what came before.
          body: JSON.stringify({ message: question, history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const detail = await res.json().catch(() => null);

          // Whatever the server actually said. One catch-all sentence for every
          // failure hides the cause and sends the next person looking in the
          // wrong place.
          setErrorCode(typeof detail?.code === "string" ? detail.code : "upstream");

          throw new Error(detail?.error || "Request failed (" + res.status + ")");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        for (;;) {
          const { done, value } = await reader.read();

          if (done) break;

          answer += decoder.decode(value, { stream: true });

          setTurns([
            ...history,
            { role: "user", content: question },
            { role: "assistant", content: answer },
          ]);
        }

        // An empty body is a failure that returned 200, and leaving a blank
        // bubble on screen looks like the answer was the silence.
        if (!answer.trim()) {
          setTurns([...history, { role: "user", content: question }]);
          setError("The archive answered with nothing. Try asking again.");
          setErrorCode("empty_answer");
        }
      } catch (err) {
        const stopped = err instanceof Error && err.name === "AbortError";

        setTurns((current) => {
          const last = current[current.length - 1];

          // Keep a partial answer that was already on screen; drop an empty one.
          if (last?.role === "assistant" && !last.content.trim()) {
            return current.slice(0, -1);
          }

          return current;
        });

        if (!stopped) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [isStreaming, turns],
  );

  const stop = () => abortRef.current?.abort();

  const clearChat = () => {
    abortRef.current?.abort();
    setTurns([]);
    setError("");
    setErrorCode("");
    setUserInput("");
    inputRef.current?.focus();
  };

  const retry = () => {
    const lastQuestion = [...turns].reverse().find((turn) => turn.role === "user");

    if (!lastQuestion) return;

    setTurns(turns.slice(0, turns.lastIndexOf(lastQuestion)));
    send(lastQuestion.content);
  };

  const isClearDisabled = turns.length === 0 && !error;

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

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
      >
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

        <ChatHistory turns={turns} streaming={isStreaming} />

        {turns.length === 0 && !error && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => send(suggestion)}
                className="px-2 py-1 text-xs rounded-full border border-yellow-400/40 text-yellow-400/80 hover:border-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
            className="text-red-400 text-center text-sm sm:text-base space-y-2"
          >
            <p>{error}</p>
            {turns.length > 0 && (
              <button
                onClick={retry}
                className="text-xs underline text-yellow-400 hover:text-yellow-300"
              >
                Try again
              </button>
            )}

            {OUTAGE_CODES.has(errorCode) && (
              <p className="text-xs text-yellow-400/70 leading-relaxed">
                This one is on me, not on you.{" "}
                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-yellow-400 hover:text-yellow-300"
                >
                  Get in touch
                </a>{" "}
                and I&apos;ll bring the archive back online.
              </p>
            )}
          </motion.div>
        )}
      </div>

      <div className="p-3 sm:p-4 border-t border-yellow-400 space-y-3 sm:space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full px-3 sm:px-4 py-2 rounded-lg bg-red-600 text-white focus:outline-none transition-colors duration-200 flex items-center justify-center text-sm sm:text-base ${
            isClearDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          onClick={clearChat}
          disabled={isClearDisabled}
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Clear Chat
        </motion.button>

        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-3 sm:px-4 py-2 rounded-lg border border-yellow-400 bg-black bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-yellow-400 placeholder-yellow-600 text-sm sm:text-base disabled:opacity-60"
            placeholder="Ex: What is the force? ... "
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(userInput);
              }
            }}
            disabled={isStreaming}
            aria-label="Ask the archive"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 sm:px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 focus:outline-none transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
            onClick={() => (isStreaming ? stop() : send(userInput))}
            disabled={!isStreaming && !userInput.trim()}
            aria-label={isStreaming ? "Stop generating" : "Send message"}
          >
            {isStreaming ? (
              <Square className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
