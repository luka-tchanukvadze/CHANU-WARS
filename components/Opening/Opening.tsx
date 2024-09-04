"use client";
import React, { useState } from "react";
import { StarWars } from "./StarWars";
import StarWarsOpening from "./StarWarsOpening";
const Opening = ({ onAnimationComplete }: any) => {
  const [showOpeningText, setShowOpeningText] = useState<boolean>(false);

  return (
    <>
      {!showOpeningText ? (
        <StarWars
          onAnimationCompleteStarWars={() => setShowOpeningText(true)}
        />
      ) : (
        <StarWarsOpening onAnimationComplete={onAnimationComplete} />
      )}
    </>
  );
};

export default Opening;
