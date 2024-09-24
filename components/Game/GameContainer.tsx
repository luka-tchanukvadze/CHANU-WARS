"use client";
import ShipImg from "@/public/game/x-wing.png";
import ShipAndLasersTwo from "./Ships/ShipAndLasersTwo";
import ShipAndLasersOne from "./Ships/ShipAndLasersOne";
import ShipsList from "../ShipsList/ShipsList";
import { useEffect, useState } from "react";
import LaserCanvas from "./Lasers/LaserCanvas";

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

type ShipInfoType = any;
// const GameContainer = () => {
//   const [firstShip, setFirstShip] = useState<ShipInfoType>();

//   const [firstShipChosen, setFirstShipChosen] = useState<boolean>(false);

//   const draw = (context: any, count: any) => {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//     context.fillStyle = "red";
//     const delta = count % 150;
//     context.fillRect(100, 1 + delta, 100, 10);
//   };

//   useEffect(() => {
//     ChooseFirstShip();
//   }, [firstShipChosen]);

//   const ChooseFirstShip = () => {
//     setFirstShip({
//       name: "X-wing",
//       model: "T-65 X-wing",
//       manufacturer: "Incom Corporation",
//       cost_in_credits: "149999",
//       length: "12.5",
//       MGLT: "100",
//       starship_class: "Starfighter",
//       combat_stats: {
//         laser_damage: 70,
//         cannons: 4,
//         accuracy: 0.85,
//       },
//       defense: {
//         hp: 1000,
//         shield: 150,
//         armor: 50,
//       },
//       mobility: {
//         speed: 90,
//         evasion: 20,
//         hyperdrive_rating: 1.0,
//       },
//       operational_capacity: {
//         crew: 1,
//         passengers: 0,
//         cargo_capacity: 110,
//         consumables: "1 week",
//       },
//       weapons: {
//         laser_type: "Laser Cannon, Proton Torpedoes",
//         weapon_range: 500,
//         fire_rate: 2,
//       },
//       special_ability: "Lock S-foils in attack position",
//       energy_capacity: 100,
//       description:
//         "The X-wing is a versatile fighter used by the Rebel Alliance, known for its adaptability in combat.",
//     });
//   };
//   console.log(firstShip?.defense?.hp);

//   return (
//     <>
//       <section className="h-screen relative">
//         <button
//           onClick={() => setFirstShipChosen((prev) => !prev)}
//           className="text-white"
//         >
//           click
//         </button>
//         <div className="h-1/2 flex justify-center items-center relative">
//           <ShipsList />
//           <div className="relative">
//             <ShipAndLasersOne
//               health={firstShip?.defense?.hp}
//               damage={firstShip?.combat_stats?.laser_damage}
//               ShipImg={ShipImg}
//             >
//               <div className="bg-red-300 absolute left-0 top-[50%] ">
//                 <LaserCanvas draw={draw} />
//               </div>
//               <div className="bg-red-300 absolute right-0 top-[50%] ">
//                 <LaserCanvas draw={draw} />
//               </div>
//             </ShipAndLasersOne>
//           </div>
//         </div>

//         <div className="absolute left-0 right-0 top-1/2 bg-cyan-200 h-[1px]"></div>

//         <div className="h-1/2 flex justify-center items-center relative">
//           <div className="absolute top-4 left-4">
//             <input />
//           </div>

//           <ShipAndLasersTwo
//             health={firstShip?.defense?.hp}
//             damage={firstShip?.combat_stats?.laser_damage}
//             ShipImg={ShipImg}
//           >
//             <div className="bg-purple-500 absolute left-0 top-[-270%] rotate-180">
//               <LaserCanvas draw={draw} />
//             </div>
//             <div className="bg-purple-500 absolute right-0 top-[-270%] rotate-180">
//               <LaserCanvas draw={draw} />
//             </div>
//           </ShipAndLasersTwo>
//         </div>
//       </section>
//     </>
//   );
// };
// export default GameContainer;
const GameContainer = () => {
  const [firstShip, setFirstShip] = useState<ShipInfoType>();

  const [firstShipChosen, setFirstShipChosen] = useState<boolean>(false);
  const [laserPosition, setLaserPosition] = useState<number>(0); // Track laser position

  const draw = (context: any, count: any) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "red";
    const delta = count % 150;
    context.fillRect(100, 1 + delta, 100, 10); // Draw laser at position
  };

  useEffect(() => {
    ChooseFirstShip();
  }, [firstShipChosen]);

  const ChooseFirstShip = () => {
    setFirstShip({
      name: "X-wing",
      model: "T-65 X-wing",
      manufacturer: "Incom Corporation",
      cost_in_credits: "149999",
      length: "12.5",
      MGLT: "100",
      starship_class: "Starfighter",
      combat_stats: {
        laser_damage: 70,
        cannons: 4,
        accuracy: 0.85,
      },
      defense: {
        hp: 1000,
        shield: 150,
        armor: 50,
      },
      mobility: {
        speed: 90,
        evasion: 20,
        hyperdrive_rating: 1.0,
      },
      operational_capacity: {
        crew: 1,
        passengers: 0,
        cargo_capacity: 110,
        consumables: "1 week",
      },
      weapons: {
        laser_type: "Laser Cannon, Proton Torpedoes",
        weapon_range: 500,
        fire_rate: 2,
      },
      special_ability: "Lock S-foils in attack position",
      energy_capacity: 100,
      description:
        "The X-wing is a versatile fighter used by the Rebel Alliance, known for its adaptability in combat.",
    });
  };

  return (
    <section className="h-screen relative">
      <button
        onClick={() => setFirstShipChosen((prev) => !prev)}
        className="text-white"
      >
        click
      </button>
      <div className="h-1/2 flex justify-center items-center relative">
        <ShipsList />
        <div className="relative">
          <ShipAndLasersOne
            health={firstShip?.defense?.hp}
            damage={firstShip?.combat_stats?.laser_damage}
            ShipImg={ShipImg}
          >
            <div className="bg-red-300 absolute left-0 top-[50%] ">
              <LaserCanvas draw={draw} setLaserPosition={setLaserPosition} />
            </div>
            <div className="bg-red-300 absolute right-0 top-[50%] ">
              <LaserCanvas draw={draw} setLaserPosition={setLaserPosition} />
            </div>
          </ShipAndLasersOne>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-1/2 bg-cyan-200 h-[1px]"></div>

      <div className="h-1/2 flex justify-center items-center relative">
        <ShipAndLasersTwo
          health={firstShip?.defense?.hp}
          damage={firstShip?.combat_stats?.laser_damage}
          ShipImg={ShipImg}
        >
          <div className="bg-purple-500 absolute left-0 top-[-270%] rotate-180">
            <LaserCanvas draw={draw} setLaserPosition={setLaserPosition} />
          </div>
          <div className="bg-purple-500 absolute right-0 top-[-270%] rotate-180">
            <LaserCanvas draw={draw} setLaserPosition={setLaserPosition} />
          </div>
        </ShipAndLasersTwo>
      </div>
    </section>
  );
};

export default GameContainer;
