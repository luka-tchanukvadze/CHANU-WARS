import { motion } from "framer-motion";
import { memo } from "react";

const Background = () => {
  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div className="fixed w-full bg-cover h-screen z-[-1]">
      <div className="min-h-screen bg-black overflow-hidden">
        <div className="fixed inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              variants={starVariants}
              initial="hidden"
              animate="show"
              transition={{
                delay: Math.random() * 2,
                duration: Math.random() * 1 + 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Background);
