"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HumburgerMenu } from "./HumburgerMenu";

interface TopbarProps {
  children?: React.ReactNode;
}

const ShipsList: React.FC<TopbarProps> = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="bg-indigo-200">
      <HumburgerMenu setIsActive={setIsActive} />
    </div>
  );
};

export default ShipsList;
