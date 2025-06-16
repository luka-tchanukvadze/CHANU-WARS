"use client";

import type React from "react";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.8,
    },
  },
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Memoize the card data so it doesn't recalculate on every render
  const cardData = useMemo(
    () => [
      {
        title: "Unlock the Holocron",
        description: "Access the ancient wisdom of the Jedi and Sith.",
        href: "/StarWarsLore",
        glowColor: "blue",
        icon: (
          <motion.div
            className="relative"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-16 h-16 mb-4 text-cyan-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <div className="absolute inset-0 w-16 h-16 mb-4 rounded-full bg-cyan-400 opacity-10 blur-xl" />
          </motion.div>
        ),
      },
      {
        title: "Galactic Bazaar",
        description: "Acquire rare artifacts from across the galaxy.",
        href: "/OnlineShop",
        glowColor: "blue",
        icon: (
          <motion.div
            className="relative"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-16 h-16 mb-4 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <div className="absolute inset-0 w-16 h-16 mb-4 rounded-full bg-amber-400 opacity-10 blur-xl" />
          </motion.div>
        ),
      },
      {
        title: "Starfighter Assault",
        description: "Pilot legendary ships in epic space battles.",
        href: "/Game",
        glowColor: "blue",
        icon: (
          <motion.div
            className="relative"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-16 h-16 mb-4 text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <div className="absolute inset-0 w-16 h-16 mb-4 rounded-full bg-red-400 opacity-10 blur-xl" />
          </motion.div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Reviews Button */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            rotateY: -180,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            duration: 0.8,
          }}
          className="relative"
        >
          <Link href="/reviews" className="block">
            <motion.div
              className="relative px-3 py-3 sm:px-10 sm:py-5 bg-black border-2 border-red-500 text-red-400 font-bold text-lg rounded-none overflow-hidden cursor-pointer"
              style={{
                fontFamily: "Orbitron, monospace",
                clipPath:
                  "polygon(10% 0%, 90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%)",
                letterSpacing: "0.2em",
                boxShadow:
                  "0 0 10px rgba(239, 68, 68, 0.5), inset 0 0 10px rgba(239, 68, 68, 0.1)",
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "rgb(239 68 68)",
                color: "rgb(248 113 113)",
                boxShadow:
                  "0 0 15px rgba(239, 68, 68, 0.7), inset 0 0 15px rgba(239, 68, 68, 0.15)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 text-sm sm:text-xl">
                [ REVIEWS ]
              </span>
            </motion.div>
          </Link>

          {/* Hologram base - static glow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        </motion.div>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="absolute inset-0 flex items-center justify-center bg-black"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center space-y-8">
              <motion.div
                className="relative"
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="w-4 h-32 bg-gradient-to-t from-blue-400 via-cyan-300 to-white rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  animate={{
                    scaleY: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.p
                className="text-cyan-300 text-xl font-light tracking-widest"
                style={{ fontFamily: "Orbitron, monospace" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                LOADING...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <div className="relative z-10 flex items-center justify-center min-h-screen pt-32 pb-16">
            <motion.nav
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-8 p-8 text-center max-w-6xl mx-auto md:grid-cols-2 xl:grid-cols-3"
            >
              {cardData.map((card, i) => (
                <motion.div
                  key={i}
                  className={`flex ${
                    i === 2
                      ? "md:col-span-2 md:justify-center xl:col-span-1 xl:justify-stretch"
                      : ""
                  }`}
                >
                  <div
                    className={`${
                      i === 2 ? "w-full md:w-1/2 xl:w-full sm:w-full" : "w-full"
                    }`}
                  >
                    <MemoizedGridCard {...card} />
                  </div>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Performance optimized GridCard component
const GridCard: React.FC<{
  title: string;
  description: string;
  href: string;
  glowColor: string;
  icon: React.ReactNode;
}> = memo(({ title, description, href, glowColor, icon }) => {
  return (
    <motion.div
      variants={gridSquareVariants}
      className="relative flex flex-col justify-between items-center p-6 rounded-none group cursor-pointer h-full max-w-sm mx-auto"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
        minHeight: "320px",
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 2,
        z: 50,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Main card background with Star Wars angular design - static shadows for performance */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 backdrop-blur-sm"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
          boxShadow:
            "inset 0 0 20px rgba(255,215,0,0.1), 0 0 20px rgba(255,215,0,0.3)",
        }}
        whileHover={{
          borderColor: "rgba(255, 215, 0, 0.8)",
          boxShadow:
            "inset 0 0 25px rgba(255,215,0,0.15), 0 0 30px rgba(255,215,0,0.4)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>

          <motion.h2
            className="text-2xl font-black text-yellow-400 mb-4 tracking-wider"
            style={{
              fontFamily: "Orbitron, Impact, Arial Black, sans-serif",
              textTransform: "uppercase",
            }}
            whileHover={{
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-gray-300 text-base leading-relaxed font-medium"
            style={{ fontFamily: "Orbitron, sans-serif" }}
            whileHover={{ color: "rgb(255 255 255)", scale: 1.02 }}
          >
            {description}
          </motion.p>
        </div>

        <Link href={href} className="group/button mt-6">
          <motion.div
            className="relative px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black overflow-hidden border-2 border-yellow-400"
            style={{
              clipPath:
                "polygon(10% 0%, 90% 0%, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 0% 30%)",
              fontFamily: "Orbitron, sans-serif",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 215, 0, 0.5)",
              borderColor: "rgba(255, 215, 0, 1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10 font-bold tracking-wide text-black text-sm">
              EXPLORE
            </span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover/button:opacity-20"
              initial={false}
              whileHover={{
                opacity: 0.2,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>
      </div>

      {/* Star Wars style corner details */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-yellow-400/50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-yellow-400/50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-yellow-400/50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-yellow-400/50" />
    </motion.div>
  );
});

GridCard.displayName = "GridCard";

// Memoized version of GridCard
const MemoizedGridCard = memo(GridCard);
export default HomePage;
