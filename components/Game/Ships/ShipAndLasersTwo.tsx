"use client";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type PropsType = {
  ShipImg: StaticImport;
  health: number;
};

const ShipAndLasersOne = ({ ShipImg, health }: PropsType) => {
  return (
    <motion.div
      drag
      className="backdrop-blur-sm w-96 flex justify-center items-center"
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
          className="w-40 h-40 object-contain rotate-180"
          // className="rotate-180 "
          src={ShipImg}
          alt="Ship"
          width={100}
          height={100}
          draggable="false"
        />
        <div className="absolute top-[-2rem] left-0 right-0  h-2 bg-cyan-200"></div>

        <div className="absolute z-0 left-5 top-1/2 h-4 w-1 bg-cyan-500 rounded-full"></div>

        {health > 4 && (
          <div className="absolute z-0 left-1/2 top-1/2 h-4 w-1 bg-cyan-500 rounded-full translate-x-1/2"></div>
        )}

        <div className="absolute z-0 right-4 top-1/2 h-4 w-1 bg-cyan-500 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};
export default ShipAndLasersOne;
