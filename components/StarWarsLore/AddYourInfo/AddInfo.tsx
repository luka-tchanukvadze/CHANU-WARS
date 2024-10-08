"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function AddInfo() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    setIsSubmitting(true);
    setError("");

    const data = {
      title,
      info,
    };

    try {
      await axios.post(
        "https://chanu-wars-back-j4ry3e27l-lukatchanukvadzes-projects.vercel.app/randomInfos",
        data
      );
      // await axios.post("http://localhost:5555/randomInfos", data);
      setIsSubmitted(true);
      setTitle("");
      setInfo("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to transmit to archives. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-opacity-90 bg-cover bg-center bg-blend-overlay text-yellow-300 py-12 px-4 sm:px-6 lg:px-8 font-['Star_Wars']">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-yellow-400 tracking-wider"
        >
          Galactic Archives: Add Your Knowledge
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6 bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-[0_0_15px_rgba(255,232,31,0.3)] border border-yellow-500/30"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium mb-2 text-blue-300"
            >
              Archive Entry Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
              placeholder="e.g. The Fall of the Jedi Order"
            />
          </div>
          <div>
            <label
              htmlFor="info"
              className="block text-lg font-medium mb-2 text-blue-300"
            >
              Galactic Knowledge
            </label>
            <textarea
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 bg-gray-800 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
              placeholder="Share your wisdom about the galaxy far, far away..."
            ></textarea>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255,232,31,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-600 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-500 transition duration-300 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Transmitting..." : "Transmit to Archives"}
          </motion.button>
        </motion.form>
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-green-800 text-green-200 rounded-md text-center shadow-lg"
            >
              Your knowledge has been added to the Galactic Archives!
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/StarWarsLore/RandomInfo"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-yellow-300 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="block text-xl mb-1">Access Galactic Archives</span>
            <span className="text-sm text-blue-300">
              Explore knowledge shared by fellow beings across the galaxy
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
