"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ArchiveEntry {
  _id: string;
  title: string;
  info: string;
  createdAt: string;
  updatedAt: string;
}

// const archiveEntries: ArchiveEntry[] = [
//   {
//     id: 1,
//     title: "The Sacred Jedi Texts",
//     information:
//       "Ancient books and scrolls containing the wisdom of the Jedi Order, preserved for millennia. These texts hold the secrets of Force abilities, lightsaber combat, and the history of the light side.",
//   },
//   {
//     id: 2,
//     title: "The Rule of Two",
//     information:
//       "A Sith philosophy established by Darth Bane. Only two there should be; no more, no less. One to embody the power, the other to crave it. This doctrine ensured the survival and strengthening of the Sith for generations.",
//   },
//   {
//     id: 3,
//     title: "Kyber Crystals",
//     information:
//       "The heart of a Jedi's lightsaber, these Force-attuned crystals resonate with their wielder. They can focus incredible amounts of energy, powering not just lightsabers but also superweapons capable of destroying entire planets.",
//   },
//   {
//     id: 4,
//     title: "The Prophecy of the Chosen One",
//     information:
//       "An ancient Jedi prophecy foretelling the coming of a being who would bring balance to the Force. Many believed this to be Anakin Skywalker, but the true nature of the prophecy remained shrouded in mystery.",
//   },
//   {
//     id: 5,
//     title: "Force Ghosts",
//     information:
//       "A rare ability allowing certain Force users to preserve their consciousness after death. These luminous beings can appear to the living, offering guidance and wisdom from beyond the veil of mortality.",
//   },
// ];

const ArchiveEntryItem: React.FC<{
  entry: ArchiveEntry;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
  hologramOpacity: number;
  isVisible: boolean;
}> = React.memo(
  ({ entry, isExpanded, toggleExpand, hologramOpacity, isVisible }) => {
    return (
      <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-900 bg-opacity-30 rounded-lg overflow-hidden border border-blue-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
      >
        <motion.button
          onClick={() => toggleExpand(entry._id)}
          className={`w-full text-left px-6 py-4 flex justify-between items-center ${
            isVisible ? "" : "pointer-events-none"
          }`}
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
        >
          <h2 className="text-2xl font-semibold text-blue-300">
            {entry.title}
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 text-blue-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 border-t border-blue-500/30">
                <p className="text-lg text-blue-100">{entry.info}</p>
                <p className="text-sm text-blue-400 mt-2">
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    );
  }
);

ArchiveEntryItem.displayName = "ArchiveEntryItem";

export default function RandomInfos() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hologramOpacity, setHologramOpacity] = useState(0.7);
  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHologramOpacity((prev) => (prev === 0.7 ? 0.9 : 0.7));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://chanu-wars-back.vercel.app/randomInfos")
      // .get("http://localhost:5555/randomInfos")
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

  return (
    <div className="min-h-screen bg-cover bg-center bg-blend-overlay text-blue-300 py-12 px-4 sm:px-6 lg:px-8 font-['Star_Wars']">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative"
      >
        <motion.div
          className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl"
          animate={{ opacity: hologramOpacity * 0.2 }}
          transition={{ duration: 1 }}
        />
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-center mb-12 text-blue-300 tracking-wider relative z-10"
        >
          Jedi Archives
        </motion.h1>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-2xl text-blue-300"
          >
            Loading archives...
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-2xl text-red-500"
          >
            {error}
          </motion.div>
        ) : archiveEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-2xl text-blue-300"
          >
            No archive entries found. The archives seem to be empty.
          </motion.div>
        ) : (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8 relative z-10"
          >
            <AnimatePresence>
              {archiveEntries.map((entry: ArchiveEntry) => (
                <ArchiveEntryItem
                  key={entry._id}
                  entry={entry}
                  isExpanded={expandedId === entry._id}
                  toggleExpand={toggleExpand}
                  hologramOpacity={hologramOpacity}
                  isVisible={expandedId === null || expandedId === entry._id}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
}
