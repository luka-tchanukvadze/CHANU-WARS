"use client";
import { useState, createContext, useContext, ReactNode } from "react";

// Define the shape of your context data
interface AudioContextType {
  audioStarted: boolean;
  setAudioStarted: (started: boolean) => void;
}

// Initialize context with undefined to ensure proper typing
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Create the provider component
export const AudioContextProvider = ({ children }: { children: ReactNode }) => {
  const [audioStarted, setAudioStarted] = useState(false);

  return (
    <AudioContext.Provider value={{ audioStarted, setAudioStarted }}>
      {children}
    </AudioContext.Provider>
  );
};

// Custom hook to use the AudioContext
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider"
    );
  }
  return context;
};
