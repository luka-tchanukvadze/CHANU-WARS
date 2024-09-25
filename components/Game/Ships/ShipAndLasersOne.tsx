import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LaserCanvas from "../Lasers/LaserCanvas";

type PropsType = {
  ShipImg: StaticImport;
  damage: number;
  health: number;
};

const ShipAndLasersOne = ({ ShipImg, damage, health }: PropsType) => {
  const [healthPercent, setHealthPercent] = useState<number>(100);
  const shipRef = useRef<HTMLDivElement>(null); // Reference to the ship div
  const [laserYPosition, setLaserYPosition] = useState<number>(0); // Track laser position

  const [shipPosition, setShipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  // Track all previous positions with unique ids
  const [previousPositions, setPreviousPositions] = useState<
    { id: number; top: number; left: number }[]
  >([]);

  const draw = (context: any, count: any) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "red";
    const delta = count % 150;
    context.fillRect(100, 1 + delta, 100, 10);
  };

  const Percent = (damage / health) * 100;

  const healthFunc = () => {
    setHealthPercent((prev) => Math.max(prev - Percent, 0)); // Ensure health doesn't drop below 0
  };

  // Fire a laser automatically every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(fireLaser, 2000); // Fire laser every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const fireLaser = () => {
    // When firing a laser, store the current position with a unique id
    if (shipRef.current) {
      const shipRect = shipRef.current.getBoundingClientRect();
      const newLaser = {
        id: Date.now(), // Using timestamp as unique id
        top: shipRect.top,
        left: shipRect.left,
      };

      setPreviousPositions((prev) => [...prev, newLaser]);

      // Remove laser after 2 seconds
      setTimeout(() => {
        setPreviousPositions((prev) =>
          prev.filter((laser) => laser.id !== newLaser.id)
        );
      }, 2000); // Remove laser after 2 seconds
    }
  };

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

        {/* Render laser divs at each previous position */}
        {previousPositions.map((position) => (
          <div
            key={position.id}
            className="bg-red-300"
            style={{
              position: "fixed",
              left: `${position.left - 350}px`,
              top: `${position.top}px`,
            }}
          >
            <LaserCanvas draw={draw} />
          </div>
        ))}

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
