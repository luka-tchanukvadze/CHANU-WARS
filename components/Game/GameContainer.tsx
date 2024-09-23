"use client";
import ShipImg from "@/public/game/x-wing.png";
import ShipAndLasersTwo from "./Ships/ShipAndLasersTwo";
import ShipAndLasersOne from "./Ships/ShipAndLasersOne";
import ShipsList from "../ShipsList/ShipsList";

const shipNamesList = [
  "X-wing",
  "CR90 corvette",
  "Star Destroyer",
  "Sentinel-class landing craft",
  "Death Star",
  "Millennium Falcon",
  "Y-wing",
  "TIE Advanced x1",
  "Executor",
];
const GameContainer = () => {
  return (
    <>
      <section className="h-screen relative">
        <div className="h-1/2 flex justify-center items-center relative">
          <ShipsList />
          <ShipAndLasersOne health={5} ShipImg={ShipImg} />
        </div>

        <div className="absolute left-0 right-0 top-1/2 bg-cyan-200 h-[1px]"></div>

        <div className="h-1/2 flex justify-center items-center relative">
          <div className="absolute top-4 left-4">
            <input />
          </div>
          <ShipAndLasersTwo ShipImg={ShipImg} health={5} />
        </div>
      </section>
    </>
  );
};
export default GameContainer;
