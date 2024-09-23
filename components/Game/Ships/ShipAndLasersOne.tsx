"use client";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

type PropsType = {
  ShipImg: StaticImport;
  health: number;
};

const ShipAndLasersOne = ({ ShipImg, health }: PropsType) => {
  const [healthPercent, setHealthPercent] = useState<number>(80);

  // useEffect(() => {
  //   healthFunc();
  // }, [healthPercent]);

  const healthFunc = () => {
    setHealthPercent((prev) => prev - 1);
    console.log("a");
  };

  return (
    <motion.div
      drag
      className="backdrop-blur-sm bg-red-200 w-96 flex justify-center items-center"
    >
      <motion.div
        drag
        dragConstraints={{
          top: 0,
          right: 100,
          left: -100,
          bottom: 0,
        }}
        dragTransition={{
          bounceStiffness: 500,
          // bounceDamping: 30,
        }}
        className="relative"
      >
        <Image
          className="w-40 h-40 object-contain"
          // className="rotate-180 "
          src={ShipImg}
          alt="Ship"
          width={100}
          height={100}
          draggable="false"
        />
        <div className="absolute top-[-2rem] left-0 right-0  h-2 bg-cyan-200 w-full" />
        <div
          className={`absolute top-[-2rem] left-0 right-0  h-2 bg-red-600`}
          style={{ width: `${healthPercent}%` }}
        />
        <div
          className={`absolute top-[-5rem] left-10   p-2 bg-red-600`}
          onClick={healthFunc}
        >
          Click
        </div>

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
