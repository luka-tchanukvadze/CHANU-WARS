"use client";
import useCart from "@/hooks/useCart";
import { useState } from "react";
import CartlineItem from "./CartlineItem";
import { motion } from "framer-motion";
import Link from "next/link";
import { CartItemType } from "@/context/CartProvider";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: any;
}
interface Product {
  name: string;
  type: string;
  description: string;
  price: number;
  sku: string;
}

const Cart = () => {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const storedOrderHistory: any = localStorage.getItem("orderHistory");

  const onSubmitOrder = () => {
    const currentHistory = JSON.parse(
      localStorage.getItem("orderHistory") || "[]"
    );

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const addToHistory: Order = {
      id: `ORD${currentHistory.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      total: totalAmount,
      status: "Delivered",
      items: cart,
    };

    const updatedHistory = [...currentHistory, addToHistory];
    localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));

    console.log("Updated Order History:", updatedHistory);

    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mt-8"
    >
      <h2 className="text-yellow-400 font-bold text-2xl mb-4">
        Thank you for your order.
      </h2>
      <p className="text-blue-300">
        Your items will be delivered to your starship soon!
      </p>
      <Link
        href="/OnlineShop/OrderHistory"
        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 underline"
      >
        Check Order History
      </Link>
    </motion.div>
  ) : (
    <div>
      <ul className="space-y-4 mb-8">
        {cart.map((item) => (
          <CartlineItem
            key={item.sku}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/30 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <p className="text-blue-300 text-lg">
            Total Items:{" "}
            <span className="text-cyan-400 font-bold">{totalItems}</span>
          </p>
          <p className="text-yellow-300 text-lg">
            Total Price:{" "}
            <span className="text-yellow-400 font-bold">
              {totalPrice} credits
            </span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto md:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-full shadow-[0_0_10px_rgba(0,0,255,0.3)] hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </motion.button>
      </motion.div>
    </div>
  );

  const content = (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {pageContent}
      </motion.div>
    </main>
  );

  return content;
};
export default Cart;
