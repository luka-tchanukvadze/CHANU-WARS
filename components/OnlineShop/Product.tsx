"use client";

import { ProductType } from "@/context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "@/context/CartProvider";
import { ReactElement, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  const img: string = `@/public/${product.sku}.jpg`;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? "=> Item in Cart" : null;

  const content = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-[0_0_15px_rgba(255,232,31,0.3)] flex flex-col justify-between items-center text-center h-full transform hover:scale-105 transition-transform duration-300 border border-yellow-500/30"
    >
      <div>
        <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-4 text-yellow-400 font-starwars tracking-wider">
          {product.name}
        </h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 mx-auto"
        >
          <Image
            width={1000}
            height={1000}
            src={product.sku}
            alt={product.name}
            className="object-cover rounded-lg shadow-md border-2 border-blue-500/50 h-32 sm:h-44"
          />
        </motion.div>
        <p className="text-xs sm:text-sm lg:text-base mb-2 text-blue-300">
          Type: <span className="text-cyan-400">{product.type}</span>
        </p>
        <p className="text-xs sm:text-sm lg:text-base mb-4 text-gray-300">
          {product.description}
        </p>
      </div>
      <div>
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-yellow-300">
          {product.price} credits
        </p>
        {itemInCart && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-green-400 mb-2"
          >
            {itemInCart}
          </motion.p>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  );

  return content;
};

function areProductsEqual(
  { product: PrevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return Object.keys(PrevProduct).every((key) => {
    return (
      PrevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType] && prevInCart === nextInCart
    );
  });
}
const memoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default memoizedProduct;
