import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModuleLoadingScreenProps {
  onComplete: () => void;
}

export function ModuleLoadingScreen({ onComplete }: ModuleLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const steps = [
    { text: "Initializing", duration: 1000 },
    { text: "Analyzing", duration: 1000 },
    { text: "Preparing your dashboard", duration: 1500, glow: true },
  ];

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Step progression
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      // All steps complete, trigger transition
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 100);

      return () => clearTimeout(completeTimer);
    }
  }, [currentStep, onComplete]);

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
              <motion.p
                className="font-['Michroma'] tracking-[0.2em] text-2xl"
                style={{
                  color: "#EAEAEA",
                  textShadow: steps[currentStep].glow
                    ? "0 0 30px rgba(0, 255, 136, 0.6)"
                    : "none",
                }}
              >
                {steps[currentStep].text}
              </motion.p>

              {/* Animated dots */}
              <span className="flex gap-[3px] ml-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    style={{ color: "#EAEAEA" }}
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

              {/* Blinking cursor */}
              <motion.span
                className="ml-1 inline-block w-[3px] h-6 bg-[#EAEAEA]"
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
