import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LaserCanvas from "../Lasers/LaserCanvas";

type PropsType = {
  ShipImg: StaticImport;
  damage: number;
  health: number;
  children: any;
};

const ShipAndLasersOne = ({ ShipImg, damage, health, children }: PropsType) => {
  const [healthPercent, setHealthPercent] = useState<number>(100);
  const shipRef = useRef<HTMLDivElement>(null); // Reference to the ship div
  const targetRef = useRef<HTMLDivElement>(null); // Reference to the target div (blue square)

  const Percent = (damage / health) * 100;

  const healthFunc = () => {
    setHealthPercent((prev) => Math.max(prev - Percent, 0)); // Ensure health doesn't drop below 0
  };

  // Function to check if two elements overlap
  const checkOverlap = () => {
    if (shipRef.current && targetRef.current) {
      const shipRect = shipRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      // Check if the two divs overlap (collision detection)
      if (
        shipRect.left < targetRect.right &&
        shipRect.right > targetRect.left &&
        shipRect.top < targetRect.bottom &&
        shipRect.bottom > targetRect.top
      ) {
        // Deal damage if they overlap
        healthFunc();
      }
    }
  };

  useEffect(() => {
    // Check for overlap on mount and when the component updates
    checkOverlap();

    const interval = setInterval(() => {
      checkOverlap();
    }, 100); // Check every 100ms

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [healthPercent]); // Add healthPercent as a dependency to check overlap after updates

  return (
    <motion.div className="backdrop-blur-sm bg-red-200 w-96 flex justify-center items-center relative">
      <motion.div
        ref={shipRef}
        drag
        dragConstraints={{
          top: 0,
          right: 100,
          left: -100,
          bottom: 0,
        }}
        dragTransition={{
          bounceStiffness: 500,
        }}
        className="relative"
      >
        <Image
          className="w-40 h-40 object-contain"
          src={ShipImg}
          alt="Ship"
          width={100}
          height={100}
          draggable="false"
        />
        {children}

        {/* Render laser divs at each previous position */}

        {/* Health Bar Background */}
        <div className="absolute top-[-2rem] left-0 right-0 h-2 bg-cyan-200 w-full" />

        {/* Health Bar Foreground */}
        <div
          className={`absolute top-[-2rem] left-0 right-0 h-2 bg-red-600`}
          style={{ width: `${healthPercent}%` }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ShipAndLasersOne;
