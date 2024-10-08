"use client";
import React, { useState, useRef, useContext } from "react";
import HomePage from "@/components/HomePage/HomePage";
import Opening from "@/components/Opening/Opening";

export default function Home() {
  const [showHomePage, setShowHomePage] = useState(
    sessionStorage.getItem("showHomePage") || ""
  );

  const setSessionStorage = () => {
    sessionStorage.setItem("showHomePage", "noSWopening");
    setShowHomePage("noSWopening");
  };

  return (
    <>
      {/* {showHomePage === "" ? (
        <Opening onAnimationComplete={() => setSessionStorage()} />
      ) : (
        <HomePage />
      )} */}

      <HomePage />
    </>
  );
}
