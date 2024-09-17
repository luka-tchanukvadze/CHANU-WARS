"use client";
import React, { useState, useRef, useContext } from "react";
import HomePage from "@/components/HomePage/HomePage";
import Opening from "@/components/Opening/Opening";

export default function Home() {
  const [showHomePage, setShowHomePage] = useState<boolean>(false);

  return (
    <>
      {/* {!showHomePage ? (
        <Opening onAnimationComplete={() => setShowHomePage(true)} />
      ) : (
        <HomePage />
      )} */}

      <HomePage />
    </>
  );
}
