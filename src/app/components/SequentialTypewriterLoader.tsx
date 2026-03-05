import { useState, useEffect } from "react";
import { TypewriterLoader } from "./TypewriterLoader";
import { AnimatePresence } from "motion/react";

interface SequentialTypewriterLoaderProps {
  onComplete?: () => void;
}

export function SequentialTypewriterLoader({ onComplete }: SequentialTypewriterLoaderProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const screens = [
    "Welcome Back, Commander",
    "Your Dashboard Is Loading"
  ];

  const handleScreenComplete = () => {
    if (currentScreen < screens.length - 1) {
      // Move to next screen
      setCurrentScreen(prev => prev + 1);
    } else {
      // All screens complete, call onComplete
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentScreen < screens.length && (
        <TypewriterLoader
          key={currentScreen}
          text={screens[currentScreen]}
          onComplete={handleScreenComplete}
        />
      )}
    </AnimatePresence>
  );
}
