"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const TieFighterIcon = () => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    className="text-gray-300"
    animate={{
      rotateY: [0, 180, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    <rect
      x="10"
      y="40"
      width="15"
      height="20"
      fill="currentColor"
      opacity="0.7"
    />
    <rect
      x="75"
      y="40"
      width="15"
      height="20"
      fill="currentColor"
      opacity="0.7"
    />
    <circle cx="50" cy="50" r="12" fill="currentColor" />
    <rect x="25" y="48" width="50" height="4" fill="currentColor" />
    <circle
      cx="50"
      cy="50"
      r="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
  </motion.svg>
);

const DataStream = ({ faction }: { faction: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-px bg-gradient-to-b from-transparent via-${
          faction === "jedi" ? "blue" : "red"
        }-400 to-transparent opacity-30`}
        style={{
          left: `${15 + i * 15}%`,
          height: "100%",
        }}
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: i * 0.3,
        }}
      />
    ))}
  </div>
);

const CircuitPattern = ({ faction }: { faction: string }) => (
  <div className="absolute inset-0 opacity-10">
    <svg
      width="100%"
      height="100%"
      className={`text-${faction === "jedi" ? "cyan" : "orange"}-400`}
    >
      <defs>
        <pattern
          id="circuit"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M10 10h40v40h-40z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="30" cy="30" r="3" fill="currentColor" />
          <path
            d="M30 10v20M10 30h20M50 30h10M30 50v10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  </div>
);

const ScanLine = ({ faction }: { faction: string }) => (
  <motion.div
    className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-${
      faction === "jedi" ? "blue" : "red"
    }-500 to-transparent opacity-60`}
    animate={{
      y: [0, 500],
    }}
    transition={{
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
);

export default function Signup() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    faction: "jedi",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const factionThemes = {
    jedi: {
      primary: "blue",
      secondary: "cyan",
      accent: "white",
      bg: "from-blue-900/30 to-cyan-800/20",
      border: "border-blue-500/40",
      text: "text-blue-300",
      icon: "⚔️",
      label: "JEDI ORDER",
      network: "REPUBLIC REGISTRY",
    },
    sith: {
      primary: "red",
      secondary: "orange",
      accent: "yellow",
      bg: "from-red-900/30 to-orange-800/20",
      border: "border-red-500/40",
      text: "text-red-300",
      icon: "⚡",
      label: "SITH EMPIRE",
      network: "IMPERIAL REGISTRY",
    },
  };

  const currentTheme =
    factionThemes[formData.faction as keyof typeof factionThemes];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "https://chanu-wars-back.vercel.app/api/v1/users/signup",
        // "http://localhost:8000/api/v1/users/signup",
        { ...formData },
        { withCredentials: true }
      );
      console.log(res.data.data.user);
      setUser(res.data.data.user);
      setIsSubmitting(false);
      router.push("/reviews");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center justify-center p-4">
      {/* Home Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 text-gray-400 hover:text-white transition-colors duration-300 font-mono text-xl sm:text-2xl tracking-wide"
      >
        [← HOME]
      </Link>
      <CircuitPattern faction={formData.faction} />
      <DataStream faction={formData.faction} />
      <ScanLine faction={formData.faction} />

      {/* Hexagonal background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 border border-${currentTheme.primary}-500/20`}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <motion.div
          className={`bg-gradient-to-br ${currentTheme.bg} backdrop-blur-2xl rounded-2xl border ${currentTheme.border} p-8 relative overflow-hidden`}
          style={{
            boxShadow: `0 0 40px rgba(${
              formData.faction === "jedi" ? "0, 255, 255" : "255, 100, 100"
            }, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.3)`,
            background: `linear-gradient(135deg, rgba(${
              formData.faction === "jedi" ? "0, 20, 40" : "40, 0, 0"
            }, 0.8), rgba(${
              formData.faction === "jedi" ? "0, 40, 80" : "80, 20, 0"
            }, 0.6))`,
          }}
        >
          {/* Tech border lines */}
          <div
            className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-${currentTheme.secondary}-400 to-transparent`}
          />
          <div
            className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-${currentTheme.secondary}-400 to-transparent`}
          />
          <div
            className={`absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-${currentTheme.secondary}-400 to-transparent`}
          />
          <div
            className={`absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-${currentTheme.secondary}-400 to-transparent`}
          />

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <TieFighterIcon />
            </div>
            <motion.div
              className={`inline-block px-4 py-2 bg-black/50 rounded-lg border border-${currentTheme.secondary}-500/50 mb-3`}
              animate={{
                boxShadow: [
                  `0 0 20px rgba(${
                    formData.faction === "jedi" ? "0, 255, 255" : "255, 165, 0"
                  }, 0.3)`,
                  `0 0 30px rgba(${
                    formData.faction === "jedi" ? "0, 255, 255" : "255, 165, 0"
                  }, 0.5)`,
                  `0 0 20px rgba(${
                    formData.faction === "jedi" ? "0, 255, 255" : "255, 165, 0"
                  }, 0.3)`,
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span
                className={`${
                  formData.faction === "jedi"
                    ? "text-cyan-400"
                    : "text-orange-400"
                } font-mono text-sm tracking-widest`}
              >
                {currentTheme.network}
              </span>
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-white mb-2 tracking-wider font-mono"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 255, 255, 0.5)",
                  `0 0 20px rgba(${
                    formData.faction === "jedi"
                      ? "0, 255, 255"
                      : "255, 100, 100"
                  }, 0.8)`,
                  "0 0 10px rgba(255, 255, 255, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              NEW RECRUIT
            </motion.h1>
            <motion.p
              className="text-gray-300 text-sm font-mono"
              variants={itemVariants}
            >
              {formData.faction === "jedi"
                ? "Begin Your Jedi Training"
                : "Join the Dark Side"}
            </motion.p>
          </motion.div>

          {/* Faction Selector */}
          <motion.div variants={itemVariants} className="mb-5">
            <label
              className={`block ${
                formData.faction === "jedi"
                  ? "text-cyan-300"
                  : "text-orange-300"
              } text-xs font-mono font-bold mb-3 tracking-widest`}
            >
              CHOOSE YOUR DESTINY
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, faction: "jedi" })}
                className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 font-mono text-sm ${
                  formData.faction === "jedi"
                    ? "border-blue-500 bg-blue-500/20 text-blue-300"
                    : "border-gray-600 bg-gray-800/50 text-gray-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">⚔️</div>
                  <div className="font-bold tracking-wide">JEDI ORDER</div>
                  <div className="text-xs opacity-75">Light Side</div>
                </div>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, faction: "sith" })}
                className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 font-mono text-sm ${
                  formData.faction === "sith"
                    ? "border-red-500 bg-red-500/20 text-red-300"
                    : "border-gray-600 bg-gray-800/50 text-gray-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">⚡</div>
                  <div className="font-bold tracking-wide">SITH EMPIRE</div>
                  <div className="text-xs opacity-75">Dark Side</div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* name Field */}
            <motion.div variants={itemVariants}>
              <label
                className={`block ${
                  formData.faction === "jedi"
                    ? "text-cyan-300"
                    : "text-orange-300"
                } text-xs font-mono font-bold mb-2 tracking-widest`}
              >
                {formData.faction === "jedi"
                  ? "PADAWAN NAME"
                  : "APPRENTICE TITLE"}
              </label>
              <motion.div className="relative">
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-black/70 border ${
                    focusedField === "name"
                      ? `border-${currentTheme.secondary}-400`
                      : "border-gray-600"
                  } rounded-lg text-${
                    currentTheme.primary
                  }-500 placeholder-gray-500 focus:outline-none transition-all duration-300 font-mono text-sm`}
                  placeholder={
                    formData.faction === "jedi"
                      ? "Young Skywalker"
                      : "Darth Revan"
                  }
                  whileFocus={{ scale: 1.01 }}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    className={`w-2 h-2 bg-${currentTheme.primary}-400 rounded-full`}
                    animate={{
                      opacity: focusedField === "name" ? [0.3, 1, 0.3] : 0.3,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <AnimatePresence>
                  {focusedField === "name" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${currentTheme.secondary}-400 to-${currentTheme.primary}-500`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                className={`block ${
                  formData.faction === "jedi"
                    ? "text-cyan-300"
                    : "text-orange-300"
                } text-xs font-mono font-bold mb-2 tracking-widest`}
              >
                {formData.faction === "jedi"
                  ? "TEMPLE COMM LINK"
                  : "IMPERIAL FREQUENCY"}
              </label>
              <motion.div className="relative">
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-black/70 border ${
                    focusedField === "email"
                      ? `border-${currentTheme.secondary}-400`
                      : "border-gray-600"
                  } rounded-lg text-${
                    currentTheme.primary
                  }-500 placeholder-gray-500 focus:outline-none transition-all duration-300 font-mono text-sm`}
                  placeholder={
                    formData.faction === "jedi"
                      ? "padawan@jedi-temple.org"
                      : "apprentice@sith-empire.gov"
                  }
                  whileFocus={{ scale: 1.01 }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    className={`w-2 h-2 bg-green-400 rounded-full`}
                    animate={{
                      opacity: focusedField === "email" ? [0.3, 1, 0.3] : 0.3,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <AnimatePresence>
                  {focusedField === "email" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-${currentTheme.primary}-500`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label
                className={`block ${
                  formData.faction === "jedi"
                    ? "text-cyan-300"
                    : "text-orange-300"
                } text-xs font-mono font-bold mb-2 tracking-widest`}
              >
                {formData.faction === "jedi"
                  ? "FORCE ENCRYPTION"
                  : "SITH PROTOCOL"}
              </label>
              <motion.div className="relative">
                <motion.input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-black/70 border ${
                    focusedField === "password"
                      ? `border-${currentTheme.secondary}-400`
                      : "border-gray-600"
                  } rounded-lg text-${
                    currentTheme.primary
                  }-500 placeholder-gray-500 focus:outline-none transition-all duration-300 font-mono text-sm`}
                  placeholder="••••••••••••"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    className={`w-2 h-2 bg-${
                      formData.faction === "jedi" ? "yellow" : "red"
                    }-400 rounded-full`}
                    animate={{
                      opacity:
                        focusedField === "password" ? [0.3, 1, 0.3] : 0.3,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <AnimatePresence>
                  {focusedField === "password" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${
                        formData.faction === "jedi" ? "yellow" : "red"
                      }-400 to-${
                        formData.faction === "jedi" ? "blue" : "orange"
                      }-500`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label
                className={`block ${
                  formData.faction === "jedi"
                    ? "text-cyan-300"
                    : "text-orange-300"
                } text-xs font-mono font-bold mb-2 tracking-widest`}
              >
                {formData.faction === "jedi"
                  ? "VERIFY ENCRYPTION"
                  : "CONFIRM PROTOCOL"}
              </label>
              <motion.div className="relative">
                <motion.input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("passwordConfirm")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-black/70 border ${
                    focusedField === "passwordConfirm"
                      ? `border-${currentTheme.secondary}-400`
                      : "border-gray-600"
                  } rounded-lg text-${
                    currentTheme.primary
                  }-500 placeholder-gray-500 focus:outline-none transition-all duration-300 font-mono text-sm`}
                  placeholder="••••••••••••"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    className={`w-2 h-2 bg-purple-400 rounded-full`}
                    animate={{
                      opacity:
                        focusedField === "passwordConfirm"
                          ? [0.3, 1, 0.3]
                          : 0.3,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <AnimatePresence>
                  {focusedField === "passwordConfirm" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-${currentTheme.primary}-500`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="submit"
                className={`w-full py-4 bg-gradient-to-r ${
                  formData.faction === "jedi"
                    ? "from-cyan-600 via-blue-600 to-purple-600"
                    : "from-red-600 via-orange-600 to-yellow-600"
                } text-white font-mono font-bold text-sm tracking-widest rounded-lg relative overflow-hidden group`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 30px rgba(${
                    formData.faction === "jedi"
                      ? "0, 255, 255"
                      : "255, 100, 100"
                  }, 0.5)`,
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                style={{
                  boxShadow: `0 5px 20px rgba(${
                    formData.faction === "jedi"
                      ? "0, 255, 255"
                      : "255, 100, 100"
                  }, 0.3)`,
                }}
              >
                <motion.div
                  className="flex items-center justify-center space-x-3"
                  animate={isSubmitting ? { opacity: [1, 0.7, 1] } : {}}
                  transition={{
                    duration: 0.8,
                    repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-4 bg-white rounded-full"
                            animate={{
                              scaleY: [1, 2, 1],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </motion.div>
                      <span>REGISTERING</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {formData.faction === "jedi"
                          ? "BEGIN TRAINING"
                          : "JOIN THE EMPIRE"}
                      </span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        ▶
                      </motion.span>
                    </>
                  )}
                </motion.div>

                {/* Button scan line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                />
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-5 space-y-3"
          >
            <div className="flex items-center justify-center space-x-2 text-xs font-mono">
              <span className="text-gray-500">
                Already {formData.faction === "jedi" ? "trained" : "initiated"}?
              </span>
              <Link
                href="/login"
                className={`${
                  formData.faction === "jedi"
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-orange-400 hover:text-orange-300"
                } font-bold tracking-wide`}
              >
                [ACCESS TERMINAL]
              </Link>
            </div>
          </motion.div>

          {/* Status indicators */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.div
              className={`w-2 h-2 bg-${currentTheme.primary}-400 rounded-full`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className={`w-2 h-2 bg-${currentTheme.secondary}-400 rounded-full`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            />
            <motion.div
              className={`w-2 h-2 bg-${
                formData.faction === "jedi" ? "yellow" : "orange"
              }-400 rounded-full`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            />
          </div>

          {/* System info */}
          <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-500">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {formData.faction === "jedi" ? "RECRUIT_v1.0.1" : "ENLIST_v2.1.3"}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
