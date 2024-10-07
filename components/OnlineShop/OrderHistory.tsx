"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  name: string;
  type: string;
  description: string;
  price: number;
  sku: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderHistory = localStorage.getItem("orderHistory");
    if (storedOrderHistory) {
      try {
        const parsedOrderHistory = JSON.parse(storedOrderHistory);
        setOrderHistory(
          Array.isArray(parsedOrderHistory) ? parsedOrderHistory : []
        );
      } catch (error) {
        console.error("Error parsing order history:", error);
        setOrderHistory([]);
      }
    }
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-yellow-400 mb-8"
        >
          Order History
        </motion.h1>

        {orderHistory.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <p className="text-xl text-blue-300">
              You haven't placed any orders yet. Start shopping to see your
              order history!
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={itemVariants}
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-semibold text-blue-300 mb-4"
              >
                Summary
              </motion.h2>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <motion.p
                    variants={itemVariants}
                    className="text-cyan-400 font-medium"
                  >
                    Total Orders
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    className="text-2xl font-bold"
                  >
                    {orderHistory.length}
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <motion.p
                    variants={itemVariants}
                    className="text-cyan-400 font-medium"
                  >
                    Total Spent
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    className="text-2xl font-bold"
                  >
                    {orderHistory
                      .reduce((sum, order) => sum + order.total, 0)
                      .toLocaleString()}{" "}
                    credits
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <motion.p
                    variants={itemVariants}
                    className="text-cyan-400 font-medium"
                  >
                    Last Order Date
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    className="text-2xl font-bold"
                  >
                    {orderHistory[0]?.date || "N/A"}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-4">
              {orderHistory.map((order) => (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-6 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <motion.div>
                      <motion.h3
                        variants={itemVariants}
                        className="text-xl font-semibold text-yellow-400"
                      >
                        {order.id}
                      </motion.h3>
                      <motion.p
                        variants={itemVariants}
                        className="text-blue-300"
                      >
                        {order.date}
                      </motion.p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-right">
                      <motion.p
                        variants={itemVariants}
                        className="text-lg font-semibold text-yellow-300"
                      >
                        {order.total.toLocaleString()} credits
                      </motion.p>
                      <motion.p
                        variants={itemVariants}
                        className="text-cyan-400"
                      >
                        {order.status}
                      </motion.p>
                    </motion.div>
                    <motion.div
                      initial="collapsed"
                      animate={
                        expandedOrder === order.id ? "expanded" : "collapsed"
                      }
                      variants={{
                        expanded: { rotate: 180 },
                        collapsed: { rotate: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 text-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.div>
                  </motion.div>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="px-6 pb-6 space-y-4"
                        >
                          {order.items.map((item) => (
                            <motion.div
                              key={item.name}
                              variants={itemVariants}
                              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                            >
                              <motion.div
                                variants={itemVariants}
                                className="flex items-center space-x-4"
                              >
                                <Image
                                  src={item.sku}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md"
                                />
                                <motion.div variants={itemVariants}>
                                  <motion.h4
                                    variants={itemVariants}
                                    className="font-semibold text-yellow-400"
                                  >
                                    {item.name}
                                  </motion.h4>
                                  <motion.p
                                    variants={itemVariants}
                                    className="text-blue-300"
                                  >
                                    {item.type}
                                  </motion.p>
                                  <motion.p
                                    variants={itemVariants}
                                    className="text-sm text-gray-400"
                                  >
                                    {item.description}
                                  </motion.p>
                                </motion.div>
                              </motion.div>
                              <motion.p
                                variants={itemVariants}
                                className="text-lg font-semibold text-yellow-300"
                              >
                                {item.price.toLocaleString()} credits
                              </motion.p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
