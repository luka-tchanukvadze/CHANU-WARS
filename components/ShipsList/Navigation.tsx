import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const BUTTONS = [
  {
    title: "X-wing",
  },
  {
    title: "CR90 corvette",
  },
  {
    title: "Star Destroyer",
  },
  {
    title: "Sentinel-class landing craft",
  },
  {
    title: "Death Star",
  },
  {
    title: "Millennium Falcon",
  },
  {
    title: "Y-wing",
  },
  {
    title: "TIE Advanced x1",
  },
  {
    title: "Executor",
  },
];

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variants2 = {
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

export const Navigation = ({ toggle, setIsActive }: any) => (
  <motion.ul className="ul" variants={variants}>
    {BUTTONS.map((button, index) => (
      <MenuItem
        setIsActive={setIsActive}
        toggle={toggle}
        index={index}
        key={index}
        button={button}
      />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
