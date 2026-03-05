import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Shield, User, Eye, EyeOff } from "lucide-react";
import { SequentialTypewriterLoader } from "./SequentialTypewriterLoader";

export function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    setIsLoggingIn(true);
    
    // Set login status in session storage
    sessionStorage.setItem("isLoggedIn", "true");
    
    // Show shutter animation first
    setTimeout(() => {
      setShowShutter(true);
    }, 100);

    // Show typewriter after shutter opens
    setTimeout(() => {
      setShowTypewriter(true);
    }, 1700);
  };

  const handleTypewriterComplete = () => {
    // Navigate to dashboard after typewriter completes
    navigate("/dashboard");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Deep Space Black Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000000] to-[#050510]">
        {/* Enhanced twinkling stars */}
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

        {/* Futuristic SOC Radar Grid Overlay - Very Subtle */}
        <div className="absolute inset-0 opacity-[0.08]">
          {/* Horizontal grid lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {/* Vertical grid lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-violet-400/40 to-transparent"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Subtle pulsating glow from center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Shutter Animation */}
      <AnimatePresence>
        {showShutter && (
          <>
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-900 to-slate-800 z-50"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              style={{
                boxShadow: "0 10px 80px rgba(0, 0, 0, 0.9)",
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900 to-slate-800 z-50"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              style={{
                boxShadow: "0 -10px 80px rgba(0, 0, 0, 0.9)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </motion.div>

            {/* Background zoom-out effect */}
            <motion.div
              className="absolute inset-0 bg-[#050505] z-40"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sequential Typewriter Messages */}
      <AnimatePresence>
        {showTypewriter && (
          <SequentialTypewriterLoader 
            onComplete={handleTypewriterComplete}
          />
        )}
      </AnimatePresence>

      {/* Login Form Container */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoggingIn ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glassmorphic Login Panel */}
          <motion.div 
            className="relative rounded-[20px] border backdrop-blur-[25px] shadow-2xl overflow-hidden"
            style={{
              background: "rgba(10, 20, 40, 0.35)",
              borderColor: "rgba(6, 182, 212, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 60px rgba(6, 182, 212, 0.15)",
            }}
            animate={{
              boxShadow: [
                "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 60px rgba(6, 182, 212, 0.15)",
                "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 80px rgba(6, 182, 212, 0.25)",
                "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 60px rgba(6, 182, 212, 0.15)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Animated border glow */}
            <motion.div 
              className="absolute -inset-[1px] rounded-[20px] -z-10"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3))",
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative p-10">
              {/* Header Section */}
              <motion.div
                className="flex flex-col items-center mb-8"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {/* Futuristic Security Shield Icon */}
                <motion.div
                  className="relative mb-5"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-cyan-400/40 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Shield className="relative w-16 h-16 text-cyan-300" strokeWidth={1.5} />
                </motion.div>
                
                {/* SOC Command Center Heading */}
                <h1 
                  className="text-3xl mb-2"
                  style={{ 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  SOC Command Center
                </h1>
                
                {/* Secure Access Portal Subheading */}
                <p 
                  className="text-cyan-300/70 text-sm tracking-wider"
                  style={{ 
                    fontWeight: 500,
                  }}
                >
                  Secure Access Portal
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Field */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <label 
                    className="block text-cyan-200/80 text-sm mb-2 tracking-wide" 
                    style={{ fontWeight: 500 }}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                    <motion.input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg border text-white placeholder:text-white/30 focus:outline-none transition-all duration-300"
                      style={{
                        background: "rgba(6, 182, 212, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderColor: "rgba(6, 182, 212, 0.2)",
                        boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.3)",
                      }}
                      whileFocus={{
                        borderColor: "rgba(6, 182, 212, 0.6)",
                        boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                      }}
                      placeholder="Enter your username"
                      disabled={isLoggingIn}
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <label 
                    className="block text-cyan-200/80 text-sm mb-2 tracking-wide" 
                    style={{ fontWeight: 500 }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 pr-12 py-3.5 rounded-lg border text-white placeholder:text-white/30 focus:outline-none transition-all duration-300"
                      style={{
                        background: "rgba(6, 182, 212, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderColor: "rgba(6, 182, 212, 0.2)",
                        boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.3)",
                      }}
                      whileFocus={{
                        borderColor: "rgba(6, 182, 212, 0.6)",
                        boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.3)",
                      }}
                      placeholder="Enter your password"
                      disabled={isLoggingIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/50 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me Toggle */}
                <motion.div
                  className="flex items-center justify-between pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <span className="text-cyan-200/60 text-sm tracking-wide">
                    Remember Me
                  </span>
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300`}
                    style={{
                      background: rememberMe 
                        ? "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" 
                        : "rgba(255, 255, 255, 0.1)",
                      boxShadow: rememberMe 
                        ? '0 0 25px rgba(6, 182, 212, 0.5)' 
                        : 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                      animate={{
                        x: rememberMe ? 26 : 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    className="w-full py-4 rounded-lg text-white text-base transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%)",
                      boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                    whileHover={{
                      boxShadow: "0 6px 30px rgba(6, 182, 212, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoggingIn || !username || !password}
                  >
                    {/* Ripple glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-green-300/30"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative">
                      {isLoggingIn ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          Authenticating...
                        </motion.span>
                      ) : (
                        "Sign In"
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>

              {/* Security Status Footer */}
              <motion.div
                className="mt-8 pt-6 border-t text-center space-y-1"
                style={{ borderColor: "rgba(6, 182, 212, 0.15)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p 
                  className="text-cyan-300/50 text-xs tracking-wider flex items-center justify-center gap-2" 
                  style={{ fontFamily: 'monospace' }}
                >
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Secure Connection Active
                </p>
                <p 
                  className="text-cyan-400/40 text-[10px] tracking-widest" 
                  style={{ fontFamily: 'monospace' }}
                >
                  256-BIT ENCRYPTION
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
