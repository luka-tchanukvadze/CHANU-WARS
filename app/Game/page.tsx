"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const GamePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white px-6 text-center">
        <p className="text-6xl mb-6">&#128640;</p>
        <h1 className="text-3xl font-bold mb-3 text-yellow-400">
          Your Ship Needs More Power
        </h1>
        <p className="text-gray-300 mb-2">
          This 3D space battle runs on Three.js with real-time physics
          and requires a desktop GPU to handle the action.
        </p>
        <p className="text-gray-500 mb-8 text-sm">
          Grab a keyboard, open this on a computer, and join the fight.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Return to Base
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/"
        className="absolute left-2 top-0 text-white font-extrabold text-lg rounded-lg shadow-md transition-all duration-300 hover:scale-110"
      >
        Home
      </Link>
      <div className="absolute text-white left-2 top-12">
        <div className="text-white">click on the screen to start playing</div>
        <div className="text-white">use: w,a,s,d to move</div>
        <div className="text-white">use: space to shoot</div>
      </div>
      <iframe
        src="/Quick_Game2_StarWarsThing-main/Quick_Game2_StarWarsThing-main/index.html"
        className="h-screen w-full"
        title="Embedded HTML"
      />
    </>
  );
};

export default GamePage;
