"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ArchiveEntry {
  _id: string;
  title: string;
  info: string;
  createdAt: string;
  updatedAt: string;
}

const Chevron = ({ isExpanded }: { isExpanded: boolean }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={false}
    animate={{ rotate: isExpanded ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    className="inline-block ml-2"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </motion.svg>
);

export default function JediArchives() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://chanu-wars-back.vercel.app/randomInfos")
      .then((response) => {
        setArchiveEntries(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load archive entries. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="text-center text-2xl text-yellow-400">
        Loading archives...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center min-h-[80vh] w-full perspective px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center space-y-8 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 mb-12">
          Jedi Archives
        </h1>
        <AnimatePresence>
          {archiveEntries.map((entry) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 1, height: "auto" }}
              animate={{
                opacity:
                  expandedId === null || expandedId === entry._id ? 1 : 0,
                height:
                  expandedId === null || expandedId === entry._id ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-4 text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => toggleExpand(entry._id)}
              >
                <span className="flex items-center justify-between">
                  {entry.title}
                  <Chevron isExpanded={expandedId === entry._id} />
                </span>
              </button>
              <AnimatePresence>
                {expandedId === entry._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-yellow-300 text-base sm:text-lg bg-gray-900 bg-opacity-50"
                  >
                    <p className="pt-4 px-4">{entry.info}</p>
                    <br />

                    <p className="pb-4">
                      Created: {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
