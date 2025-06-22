"use client";

import type React from "react";

import type { ProductType } from "@/context/ProductsProvider";
import type { ReducerActionType, ReducerAction } from "@/context/CartProvider";
import { type ReactElement, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
    >
      <div className="relative">
        <Image
          width={5000}
          height={5000}
          src={`${product.sku}`}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {inCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-blue-900/70 to-indigo-900/80 flex items-center justify-center"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 100, 255, 0.1) 0%, transparent 50%),
                linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.05) 50%, transparent 100%)
              `,
            }}
          >
            {/* Holographic scan lines */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)",
                }}
              />
            </div>

            {/* Glowing border */}
            <div className="absolute inset-2 border border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)]" />

            {/* Central hologram panel */}
            <div className="relative z-0 flex flex-col items-center space-y-1 sm:space-y-2">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.5)",
                    "0 0 30px rgba(0, 255, 255, 0.8)",
                    "0 0 20px rgba(0, 255, 255, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-lg p-2 sm:p-3"
              >
                <Zap
                  className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-300"
                  strokeWidth={2}
                />
              </motion.div>

              <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded px-2 py-0.5 sm:px-3 sm:py-1">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0, 255, 255, 0.8)",
                      "0 0 20px rgba(0, 255, 255, 1)",
                      "0 0 10px rgba(0, 255, 255, 0.8)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="text-cyan-300 font-mono text-[10px] sm:text-xs tracking-wider uppercase"
                >
                  ACQUIRED
                </motion.span>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-t-2 border-cyan-400/60" />
            <div className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-t-2 border-cyan-400/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-b-2 border-cyan-400/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-cyan-400/60" />
          </motion.div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price} credits
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every(
      (key) =>
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
    ) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
