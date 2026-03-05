import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModuleLoadingScreenProps {
  onComplete: () => void;
}

export function ModuleLoadingScreen({ onComplete }: ModuleLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);

  const steps = [
    { text: "Initializing", duration: 1500 },
    { text: "Analyzing", duration: 1500 },
    { text: "Preparing Your Dashboard", duration: 1500, glow: true },
  ];

  // Typewriter effect for current step
  useEffect(() => {
    if (currentStep < steps.length) {
      const currentText = steps[currentStep].text;
      
      if (currentCharIndex < currentText.length) {
        const charTimer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, 40); // 40ms per character for typewriter effect

        return () => clearTimeout(charTimer);
      } else if (!showDots) {
        // Text complete, show dots
        const dotsTimer = setTimeout(() => {
          setShowDots(true);
        }, 200);
        return () => clearTimeout(dotsTimer);
      } else {
        // Dots shown, wait before moving to next step
        const stepTimer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setDisplayedText("");
          setCurrentCharIndex(0);
          setShowDots(false);
        }, steps[currentStep].duration);

        return () => clearTimeout(stepTimer);
      }
    } else {
      // All steps complete, trigger transition
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 300);

      return () => clearTimeout(completeTimer);
    }
  }, [currentStep, currentCharIndex, showDots, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle twinkling stars */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => {
          const size = Math.random() > 0.8 ? 2 : 1;
          const brightness = Math.random() * 0.4 + 0.3;
          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, ${brightness})`,
              }}
              animate={{
                opacity: [brightness * 0.5, brightness, brightness * 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Centered text with typewriter animation */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep < steps.length && (
            <motion.div
              key={currentStep}
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                {/* Typewriter text */}
                <motion.p
                  className="font-['Michroma'] tracking-[0.2em] text-2xl"
                  style={{
                    color: "#00FF88",
                    textShadow: steps[currentStep].glow
                      ? "0 0 30px rgba(0, 255, 136, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)"
                      : "0 0 20px rgba(0, 255, 136, 0.6)",
                  }}
                >
                  {displayedText}
                </motion.p>

                {/* 5 Animated Dots after text completion */}
                {showDots && (
                  <span className="flex gap-[4px] ml-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="inline-block font-['Michroma'] text-2xl"
                        style={{
                          color: "#00FF88",
                          textShadow: "0 0 20px rgba(0, 255, 136, 0.6)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.15,
                          repeat: Infinity,
                          repeatDelay: 0.75,
                        }}
                      >
                        .
                      </motion.span>
                    ))}
                  </span>
                )}

                {/* Blinking cursor - only show while typing */}
                {!showDots && currentCharIndex < steps[currentStep].text.length && (
                  <motion.span
                    className="ml-1 inline-block w-[3px] h-6"
                    style={{
                      backgroundColor: "#00FF88",
                      boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
                    }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
