"use client";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PropsType = {
  ShipImg: StaticImport;
  damage: number;
  health: number;
  children: any;
};

// const ShipAndLasersOne = ({ ShipImg, damage, health, children }: PropsType) => {
//   const [healthPercent, setHealthPercent] = useState<number>(100);
//   const shipRef = useRef<HTMLDivElement>(null); // Reference to the ship div
//   const targetRef = useRef<HTMLDivElement>(null); // Reference to the target div (blue square)

//   const Percent = (damage / health) * 100;

//   const healthFunc = () => {
//     setHealthPercent((prev) => Math.max(prev - Percent, 0)); // Ensure health doesn't drop below 0
//   };

//   // Function to check if two elements overlap
//   const checkOverlap = () => {
//     if (shipRef.current && targetRef.current) {
//       const shipRect = shipRef.current.getBoundingClientRect();
//       const targetRect = targetRef.current.getBoundingClientRect();

//       // Check if the two divs overlap (collision detection)
//       if (
//         shipRect.left < targetRect.right &&
//         shipRect.right > targetRect.left &&
//         shipRect.top < targetRect.bottom &&
//         shipRect.bottom > targetRect.top
//       ) {
//         // Deal damage if they overlap
//         healthFunc();
//       }
//     }
//   };

//   useEffect(() => {
//     // Check for overlap on mount and when the component updates
//     checkOverlap();

//     const interval = setInterval(() => {
//       checkOverlap();
//     }, 100); // Check every 100ms

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, [healthPercent]); // Add healthPercent as a dependency to check overlap after updates

//   return (
//     <motion.div
//       drag
//       className="backdrop-blur-sm bg-red-200 w-96 flex justify-center items-center"
//     >
//       <motion.div
//         ref={shipRef} // Attach ref to the ship div
//         drag
//         dragConstraints={{
//           top: 0,
//           right: 100,
//           left: -100,
//           bottom: 0,
//         }}
//         dragTransition={{
//           bounceStiffness: 500,
//         }}
//         className="relative"
//       >
//         <Image
//           className="w-40 h-40 object-contain"
//           src={ShipImg}
//           alt="Ship"
//           width={100}
//           height={100}
//           draggable="false"
//         />
//         {children}

//         {/* Health Bar Background */}
//         <div className="absolute top-[-2rem] left-0 right-0 h-2 bg-cyan-200 w-full" />

//         {/* Health Bar Foreground */}
//         <div
//           className={`absolute top-[-2rem] left-0 right-0 h-2 bg-red-600`}
//           style={{ width: `${healthPercent}%` }}
//         />

//         {/* Laser Positions */}
//         <div className="absolute z-0 left-5 top-1/2 h-4 w-1 bg-cyan-500 rounded-full" />

//         {health > 4 && (
//           <div className="absolute z-0 left-1/2 top-1/2 h-4 w-1 bg-cyan-500 rounded-full translate-x-1/2" />
//         )}

//         <div className="absolute z-0 right-4 top-1/2 h-4 w-1 bg-cyan-500 rounded-full" />
//       </motion.div>

//       {/* Target Div (blue square) */}
//       {/* <div ref={targetRef} className="w-10 h-10 bg-blue-800" /> */}
//     </motion.div>
//   );
// };

const ShipAndLasersOne = ({ ShipImg, damage, health, children }: PropsType) => {
  const [healthPercent, setHealthPercent] = useState<number>(100);
  const shipRef = useRef<HTMLDivElement>(null); // Reference to the ship div
  const [laserYPosition, setLaserYPosition] = useState<number>(0); // Track laser position

  const Percent = (damage / health) * 100;

  const healthFunc = () => {
    setHealthPercent((prev) => Math.max(prev - Percent, 0)); // Ensure health doesn't drop below 0
  };

  // Function to check if laser hits the ship
  const checkLaserHit = () => {
    if (shipRef.current) {
      const shipRect = shipRef.current.getBoundingClientRect();

      // Check if laser is within the ship's bounding box
      if (laserYPosition >= shipRect.top && laserYPosition <= shipRect.bottom) {
        healthFunc(); // Reduce health if laser hits
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkLaserHit();
    }, 100); // Check for collision every 100ms

    return () => clearInterval(interval); // Clean up interval
  }, [laserYPosition]);

  return (
    <motion.div
      drag
      className="backdrop-blur-sm bg-red-200 w-96 flex justify-center items-center"
    >
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

        {/* Health Bar Background */}
        <div className="absolute top-[-2rem] left-0 right-0 h-2 bg-cyan-200 w-full" />

        {/* Health Bar Foreground */}
        <div
          className={`absolute top-[-2rem] left-0 right-0 h-2 bg-red-600`}
          style={{ width: `${healthPercent}%` }}
        />

        {/* Laser Positions */}
        <div className="absolute z-0 left-5 top-1/2 h-4 w-1 bg-cyan-500 rounded-full" />

        {health > 4 && (
          <div className="absolute z-0 left-1/2 top-1/2 h-4 w-1 bg-cyan-500 rounded-full translate-x-1/2" />
        )}

        <div className="absolute z-0 right-4 top-1/2 h-4 w-1 bg-cyan-500 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default ShipAndLasersOne;
