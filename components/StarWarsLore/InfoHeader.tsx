"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const InfoHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 px-4 py-4 shadow-lg relative z-10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-black font-extrabold text-2xl">
            Star Wars Lore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-black font-semibold hover:text-yellow-100"
            >
              Home
            </Link>
            <Link
              href="/StarWarsLore/FavCharacters"
              className="text-black font-semibold hover:text-yellow-100"
            >
              My Favourite Characters
            </Link>
            <Link
              href="/StarWarsLore/AddInfo"
              className="text-black font-semibold hover:text-yellow-100"
            >
              Add Your Own Information
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col items-center justify-center focus:outline-none w-8 h-8 relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* Top bar */}
            <motion.span
              className="block w-8 h-1 bg-black mb-1"
              variants={topBarVariants}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            {/* Middle bar (hidden when open) */}
            <motion.span
              className="block w-8 h-1 bg-black mb-1"
              initial={{ opacity: 1 }}
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Bottom bar */}
            <motion.span
              className="block w-8 h-1 bg-black"
              variants={bottomBarVariants}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-yellow-600 py-4 px-4 absolute w-full z-20 shadow-md"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                href="/StarWarsLore/FavCharacters"
                className="text-white"
                onClick={toggleMenu}
              >
                My Favourite Characters
              </Link>
              <Link
                href="/StarWarsLore/AddInfo"
                className="text-white"
                onClick={toggleMenu}
              >
                Add Your Own Information
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
export default InfoHeader;
