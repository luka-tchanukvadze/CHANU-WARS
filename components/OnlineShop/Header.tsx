"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, Menu, X } from "lucide-react";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4 sticky top-0 z-10 border-b border-yellow-500/30 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/OnlineShop"
              className="text-yellow-400 font-extrabold text-lg sm:text-2xl tracking-wider hover:text-yellow-300 transition-colors duration-300"
            >
              CHANU SHOP
            </Link>
            <Link
              href="/"
              className="text-blue-300 font-bold text-sm sm:text-base hover:text-blue-200 transition-colors duration-300"
            >
              HOME
            </Link>
            <Link
              href="/OnlineShop/OrderHistory"
              className="text-green-300 font-bold text-sm sm:text-base hover:text-green-200 transition-colors duration-300"
            >
              HISTORY
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <motion.nav
              className="hidden sm:block"
              initial={false}
              animate={viewCart ? "cart" : "products"}
            >
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base font-semibold flex items-center space-x-2"
                onClick={() => setViewCart((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {viewCart ? (
                    <motion.div
                      key="products"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-2"
                    >
                      <Package className="w-5 h-5" />
                      <span>View Products</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>View Cart</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.nav>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 sm:hidden"
            >
              <div className="flex flex-col space-y-2">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base font-semibold flex items-center justify-center space-x-2"
                  onClick={() => {
                    setViewCart((prev) => !prev);
                    setIsMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {viewCart ? (
                    <>
                      <Package className="w-5 h-5" />
                      <span>View Products</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>View Cart</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
