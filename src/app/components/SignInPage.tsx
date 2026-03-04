import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Lock } from "lucide-react";
import { TypewriterLoader } from "./TypewriterLoader";

export function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

    // Navigate to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 4500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Deep Space Black Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000000] to-[#050510]">
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

        {/* Faint holographic HUD lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-violet-400/50 to-transparent" />
          <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
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

      {/* Typewriter Message */}
      <AnimatePresence>
        {showTypewriter && (
          <TypewriterLoader 
            text="Welcome Back, Commander. Your dashboard is loading..." 
            onComplete={() => {}}
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
          {/* Premium Glassmorphic Card */}
          <div 
            className="relative rounded-3xl border border-white/10 backdrop-blur-[30px] shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 80px rgba(59, 130, 246, 0.15)",
            }}
          >
            {/* Soft outer glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 rounded-3xl blur-xl -z-10" />

            <div className="relative p-8">
              {/* Header */}
              <motion.div
                className="flex flex-col items-center mb-8"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.div
                  className="relative mb-6"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl" />
                  <Shield className="relative w-14 h-14 text-cyan-300" strokeWidth={1.5} />
                </motion.div>
                
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  SOC Command Center
                </h1>
                <p className="text-white/50 text-sm flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Lock className="w-4 h-4" />
                  Secure Access Portal
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
                      fontFamily: 'Inter, sans-serif',
                    }}
                    placeholder="Enter your username"
                    disabled={isLoggingIn}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
                      fontFamily: 'Inter, sans-serif',
                    }}
                    placeholder="Enter your password"
                    disabled={isLoggingIn}
                  />
                </motion.div>

                {/* Modern Toggle Switch for Remember Me */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <span className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Remember me</span>
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                      rememberMe ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-white/10'
                    }`}
                    style={{
                      boxShadow: rememberMe ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                      animate={{
                        x: rememberMe ? 22 : 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-medium text-base transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
                      boxShadow: "0 4px 20px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      fontFamily: 'Inter, sans-serif',
                    }}
                    disabled={isLoggingIn || !username || !password}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    
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
                  </button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Wazuh Security Platform v4.0
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}