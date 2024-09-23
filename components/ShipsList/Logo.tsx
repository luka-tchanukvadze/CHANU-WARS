"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const Logo: FC = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    document.addEventListener("animationend", () => {
      setIsAnimating(false);
    });
  }, []);

  return (
    <Image
      onMouseOver={() => setIsAnimating(true)}
      className={isAnimating ? "animate" : undefined}
      src="/vadar.png"
      width={32}
      height={32}
      alt="Logo"
      id="logo"
    />
  );
};

export default Logo;
