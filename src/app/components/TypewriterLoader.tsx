import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TypewriterLoaderProps {
  text: string;
  onComplete?: () => void;
}

export function TypewriterLoader({ text, onComplete }: TypewriterLoaderProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setLetters([]);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setLetters((prev) => [...prev, text[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 40);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (onComplete && currentIndex === text.length) {
      timeoutRef.current = setTimeout(() => {
        onComplete();
      }, 800);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [currentIndex, text, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Glass Panel Behind Text */}
        <motion.div
          className="relative px-12 py-8 rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(25px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px rgba(6, 182, 212, 0.15)",
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
            style={{
              width: "50%",
            }}
          />

          {/* Cyber Glow Border Enhancement */}
          <div className="absolute inset-0 rounded-2xl" style={{
            boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)",
          }} />

          {/* Text Container */}
          <div className="relative flex items-center justify-center min-h-[40px]">
            <div className="flex items-center">
              {/* Animated Letters */}
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block relative"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.75rem',
                    letterSpacing: '0.05em',
                    background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                  }}
                  initial={{ 
                    opacity: 0, 
                    y: 10,
                    filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Reflective Highlight */}
                  <span className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {letter}
                  </span>
                  
                  {/* Main Letter */}
                  {letter}
                  
                  {/* Glow Flash Effect */}
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "blur(4px)",
                    }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}

              {/* Premium Glowing Cursor Beam */}
              {currentIndex < text.length && (
                <motion.div className="relative inline-block ml-1">
                  {/* Main Cursor Beam */}
                  <motion.div
                    className="w-[3px] h-7 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)",
                    }}
                    animate={{
                      opacity: [1, 0.4, 1],
                      boxShadow: [
                        "0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)",
                        "0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(6, 182, 212, 0.6)",
                        "0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Cursor Glow Halo */}
                  <motion.div
                    className="absolute inset-0 w-[3px] h-7 rounded-full blur-sm"
                    style={{
                      background: "linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)",
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Micro Particle Sparks */}
                  <AnimatePresence>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`spark-${currentIndex}-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400"
                        style={{
                          left: Math.random() * 6 - 3,
                          top: Math.random() * 28,
                          boxShadow: "0 0 8px rgba(6, 182, 212, 0.8)",
                        }}
                        initial={{ 
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: 0,
                          scale: 0,
                          x: (Math.random() - 0.5) * 20,
                          y: (Math.random() - 0.5) * 20,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>

          {/* Additional subtle corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-cyan-400/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-cyan-400/20 rounded-br-2xl" />
        </motion.div>

        {/* Outer Glow Aura */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}