import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Crown, Eye } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [eyeClosing, setEyeClosing] = useState(false);
  const [proceedToSignIn, setProceedToSignIn] = useState(false);

  useEffect(() => {
    // Eye opens after initial load
    const eyeTimer = setTimeout(() => {
      setEyeOpen(true);
    }, 800);

    // Text appears after eye opens
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1800);

    return () => {
      clearTimeout(eyeTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleProceed = () => {
    // Close the eye first
    setEyeClosing(true);
    setEyeOpen(false);
    setProceedToSignIn(true);

    // Navigate after eye closes
    setTimeout(() => {
      navigate("/signin");
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Deep Space Black Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #000000 0%, #0a0a0f 50%, #000000 100%)",
        }}
      >
        {/* Enhanced twinkling stars with drift */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => {
            const size = Math.random() > 0.7 ? 2 : 1;
            const brightness = Math.random() * 0.6 + 0.5;
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${brightness})`,
                }}
                animate={{
                  opacity: [brightness * 0.6, brightness, brightness * 0.6],
                  scale: [1, 1.2, 1],
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Very subtle moving nebula haze */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Faint radial glow behind center emblem */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Emblem Container */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: proceedToSignIn ? 0 : 1,
          scale: proceedToSignIn ? 1.1 : 1,
          filter: proceedToSignIn ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Pulsating glow effect behind emblem */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 120px rgba(59, 130, 246, 0.6)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Crown on Top */}
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))",
                  "drop-shadow(0 0 25px rgba(251, 191, 36, 0.8))",
                  "drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Crown className="w-20 h-20 text-amber-400" strokeWidth={1.2} />
            </motion.div>
          </motion.div>

          {/* Main Shield with Eye and Circuit Patterns */}
          <div className="relative w-72 h-80 flex items-center justify-center">
            {/* Shield SVG with Circuit Patterns */}
            <svg
              viewBox="0 0 240 300"
              className="absolute inset-0 w-full h-full"
              style={{
                filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))",
              }}
            >
              {/* Main Shield Path */}
              <motion.path
                d="M120 20 L200 60 L200 160 Q200 250 120 280 Q40 250 40 160 L40 60 Z"
                fill="url(#shieldGradient)"
                stroke="url(#strokeGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Inner Shield Detail */}
              <motion.path
                d="M120 35 L185 65 L185 155 Q185 230 120 260 Q55 230 55 155 L55 65 Z"
                fill="none"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />

              {/* Circuit Pattern - Top Left */}
              <g opacity="0.6">
                <motion.path
                  d="M70 100 L90 100 L90 120"
                  stroke="rgba(6, 182, 212, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.2, duration: 1 }}
                />
                <motion.circle
                  cx="70"
                  cy="100"
                  r="4"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
                <motion.circle
                  cx="90"
                  cy="120"
                  r="3"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                />
              </g>

              {/* Circuit Pattern - Top Right */}
              <g opacity="0.6">
                <motion.path
                  d="M170 100 L150 100 L150 120"
                  stroke="rgba(6, 182, 212, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.3, duration: 1 }}
                />
                <motion.circle
                  cx="170"
                  cy="100"
                  r="4"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                />
                <motion.circle
                  cx="150"
                  cy="120"
                  r="3"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                />
              </g>

              {/* Circuit Pattern - Bottom */}
              <g opacity="0.6">
                <motion.path
                  d="M95 180 L120 180 L120 200 M145 180 L120 180"
                  stroke="rgba(6, 182, 212, 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.4, duration: 1 }}
                />
                <motion.circle
                  cx="95"
                  cy="180"
                  r="3"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                />
                <motion.circle
                  cx="145"
                  cy="180"
                  r="3"
                  fill="rgba(6, 182, 212, 0.9)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                />
              </g>

              {/* Vertical Sword integrated subtly */}
              <motion.path
                d="M120 80 L120 240"
                stroke="url(#swordGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 1.5 }}
              />
              {/* Sword guard */}
              <motion.path
                d="M105 85 L135 85"
                stroke="rgba(217, 119, 6, 0.7)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              />
              {/* Sword pommel */}
              <motion.circle
                cx="120"
                cy="245"
                r="5"
                fill="rgba(217, 119, 6, 0.7)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient
                  id="shieldGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(30, 58, 138, 0.4)" />
                  <stop offset="50%" stopColor="rgba(37, 99, 235, 0.3)" />
                  <stop offset="100%" stopColor="rgba(29, 78, 216, 0.2)" />
                </linearGradient>
                <linearGradient
                  id="strokeGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(37, 99, 235, 0.6)" />
                </linearGradient>
                <linearGradient
                  id="swordGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
                  <stop offset="50%" stopColor="rgba(217, 119, 6, 0.7)" />
                  <stop offset="100%" stopColor="rgba(180, 83, 9, 0.6)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Cybernetic Eye in Center */}
            <div className="relative z-10">
              <motion.div
                className="relative w-24 h-24 flex items-center justify-center"
                animate={{
                  filter: eyeOpen
                    ? "drop-shadow(0 0 30px rgba(6, 182, 212, 1))"
                    : "drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))",
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Eye glow background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: eyeOpen ? [1, 1.4, 1] : 1,
                    opacity: eyeOpen ? [0.6, 1, 0.6] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Concentric circles for eye depth */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: eyeOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="rgba(6, 182, 212, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: eyeOpen ? 1 : 0 }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="none"
                      stroke="rgba(6, 182, 212, 0.5)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: eyeOpen ? 1 : 0 }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                  </svg>
                </motion.div>

                {/* Eye Icon */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    scaleY: eyeClosing ? 0.1 : eyeOpen ? 1 : 0.1,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Eye
                    className="w-16 h-16 text-cyan-400"
                    strokeWidth={1.5}
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))",
                    }}
                  />
                </motion.div>

                {/* Scanning beam effect when eye opens */}
                <AnimatePresence>
                  {eyeOpen && !eyeClosing && (
                    <motion.div
                      className="absolute left-0 right-0 h-[3px] bg-cyan-400"
                      style={{
                        boxShadow: "0 0 15px rgba(6, 182, 212, 1)",
                      }}
                      initial={{ top: "20%", opacity: 0 }}
                      animate={{
                        top: ["20%", "80%"],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text and Button */}
      <AnimatePresence>
        {showText && !proceedToSignIn && (
          <motion.div
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main Title */}
            <motion.h1
              className="text-5xl font-thin tracking-[0.3em] text-white mb-3"
              style={{
                fontFamily: "'Michroma', sans-serif",
                textShadow: "0 0 40px rgba(6, 182, 212, 0.6)",
              }}
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              IMPERIUM TECH
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base font-light tracking-[0.25em] text-cyan-300/80 mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Security Operations Center
            </motion.p>

            {/* Enter Button */}
            <motion.button
              onClick={handleProceed}
              className="relative px-12 py-4 rounded-full border-2 border-cyan-400/50 text-white font-medium tracking-[0.2em] text-sm overflow-hidden group"
              style={{
                fontFamily: "'Michroma', sans-serif",
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 30px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 50px rgba(6, 182, 212, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative flex items-center justify-center gap-3">
                <Shield className="w-5 h-5" strokeWidth={1.5} />
                ENTER COMMAND CENTER
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30 z-10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/30 z-10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30 z-10" />
    </div>
  );
}