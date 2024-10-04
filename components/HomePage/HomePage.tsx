"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.6,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" min-h-screen">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-2 h-24 bg-blue-400 rounded"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
                boxShadow: [
                  "0 0 5px #4299e1",
                  "0 0 20px #4299e1",
                  "0 0 5px #4299e1",
                ],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </motion.div>
        ) : (
          <motion.nav
            key="content"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-10 p-8 text-center items-center justify-center min-h-screen md:grid-cols-2 xl:grid-cols-3 2xl:px-40"
          >
            {/* Lore Card */}
            <GridCard
              title="Unlock the Holocron"
              description="Access the ancient wisdom of the Jedi and Sith."
              href="/StarWarsLore"
              gradient="from-blue-600 via-blue-400 to-purple-600"
              icon={
                <svg
                  className="w-12 h-12 mb-4 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              }
            />

            {/* Shop Card */}
            <GridCard
              title="Galactic Bazaar"
              description="Acquire rare artifacts from across the galaxy."
              href="/OnlineShop"
              gradient="from-red-600 via-orange-500 to-yellow-500"
              icon={
                <svg
                  className="w-12 h-12 mb-4 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              }
            />

            {/* Game Card */}
            <GridCard
              title="Starfighter Assault"
              description="Pilot legendary ships in epic space battles."
              href="/Game"
              gradient="from-green-500 via-teal-400 to-blue-600"
              icon={
                <svg
                  className="w-12 h-12 mb-4 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridCard({ title, description, href, gradient, icon }: any) {
  return (
    <motion.div
      variants={gridSquareVariants}
      className={`relative flex flex-col justify-center items-center bg-gradint-to-br ${gradient} p-8 rounded-lg shadow-lg overflow-hidden group border border-gray-700`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={false}
        whileHover={{ opacity: 0.2 }}
      />
      {icon}
      <h2 className="text-3xl font-bold text-yellow-300 mb-4">{title}</h2>
      <p className="text-blue-200 text-opacity-80 mb-6">{description}</p>
      <Link
        href={href}
        className="px-6 py-3 bg-yellow-300 bg-opacity-20 text-yellow-300 rounded-full shadow-md hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 border border-yellow-300"
      >
        Explore
      </Link>
    </motion.div>
  );
}
