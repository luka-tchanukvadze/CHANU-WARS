import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({ index, button, toggle, setIsActive }: any) => {
  return (
    <>
      <motion.li
        className="li"
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          key={index}
          className="text-stone-600 uppercase text-sm pt-2 "
          onClick={() => {
            toggle();
            console.log(button.title);
          }}
        >
          {button.title}
        </button>
      </motion.li>
    </>
  );
};
