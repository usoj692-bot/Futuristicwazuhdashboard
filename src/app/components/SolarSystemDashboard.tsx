import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Clock,
  X,
  FileSearch,
  Bug,
  Database,
  Brain,
  Crosshair,
  Target,
} from "lucide-react";
import { TypewriterLoader } from "./TypewriterLoader";

// Solar System Dashboard with Premium Glassmorphism
interface WazuhComponent {
  id: string;
  name: string;
  icon: any;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
  data?: any;
  description: string;
  initialPhase: number;
  overview: string[];
}

export function SolarSystemDashboard() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] =
    useState<WazuhComponent | null>(null);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(
    null,
  );
  const [wazuhData, setWazuhData] = useState({
    alerts: { critical: 12, high: 45, medium: 89, low: 234 },
    agents: { active: 156, disconnected: 8, total: 164 },
    events: 45234,
    compliance: 87,
  });
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const components: WazuhComponent[] = [
    {
      id: "fim",
      name: "FIM",
      icon: FileSearch,
      orbitRadius: 120,
      orbitSpeed: 45,
      size: 39,
      color: "from-blue-500 to-cyan-500",
      description: "File Integrity Monitoring",
      overview: [
        "Real-time file system monitoring",
        "Detects unauthorized changes",
        "Monitors 2,450+ critical files",
        "Active threat prevention",
      ],
      data: {
        monitored_files: 2450,
        changes_detected: 23,
        alerts_today: 5,
        status: "Active",
      },
      initialPhase: 0,
    },
    {
      id: "vulnerability",
      name: "VULNERABILITY",
      icon: Bug,
      orbitRadius: 160,
      orbitSpeed: 60,
      size: 41,
      color: "from-red-500 to-orange-500",
      description: "Vulnerability Detection",
      overview: [
        "Continuous vulnerability scanning",
        "CVE database integration",
        "8 critical vulnerabilities detected",
        "Automated patch recommendations",
      ],
      data: {
        critical: 8,
        high: 34,
        medium: 127,
        low: 456,
        last_scan: "2 hours ago",
      },
      initialPhase: 120,
    },
    {
      id: "ulm",
      name: "ULM",
      icon: Database,
      orbitRadius: 200,
      orbitSpeed: 75,
      size: 43,
      color: "from-green-500 to-emerald-500",
      description: "Unified Log Management",
      overview: [
        "Centralized log aggregation",
        "1.2M+ logs processed daily",
        "48 integrated data sources",
        "90-day retention policy",
      ],
      data: {
        logs_collected: "1.2M/day",
        sources: 48,
        storage: "2.4TB",
        retention: "90 days",
      },
      initialPhase: 240,
    },
    {
      id: "predictive",
      name: "PREDICTIVE",
      icon: Brain,
      orbitRadius: 240,
      orbitSpeed: 90,
      size: 45,
      color: "from-purple-500 to-pink-500",
      description: "AI Threat Prediction",
      overview: [
        "Machine learning threat analysis",
        "94.5% prediction accuracy",
        "34 threats predicted today",
        "Behavioral anomaly detection",
      ],
      data: {
        threats_predicted: 34,
        accuracy: "94.5%",
        model_version: "v2.1",
        last_updated: "1 hour ago",
      },
      initialPhase: 60,
    },
    {
      id: "threat-hunting",
      name: "THREAT HUNTING",
      icon: Crosshair,
      orbitRadius: 280,
      orbitSpeed: 105,
      size: 47,
      color: "from-yellow-500 to-amber-500",
      description: "Active Threat Hunting",
      overview: [
        "Proactive threat detection",
        "12 active hunting operations",
        "1,847 IOCs tracked",
        "Real-time threat intelligence",
      ],
      data: {
        active_hunts: 12,
        threats_found: 6,
        iocs_tracked: 1847,
        last_hunt: "30 min ago",
      },
      initialPhase: 180,
    },
    {
      id: "mitre",
      name: "MITRE ATT&CK",
      icon: Target,
      orbitRadius: 320,
      orbitSpeed: 120,
      size: 49,
      color: "from-indigo-500 to-violet-500",
      description: "MITRE ATT&CK Framework",
      overview: [
        "Comprehensive threat mapping",
        "78% framework coverage",
        "14 tactics detected",
        "87 techniques monitored",
      ],
      data: {
        tactics_detected: 14,
        techniques: 87,
        coverage: "78%",
        recent_ttp: "T1059.001",
      },
      initialPhase: 300,
    },
  ];

  const handlePlanetClick = (component: WazuhComponent) => {
    // Show typewriter loading message
    const messages = [
      `Initializing ${component.name} Module...`,
      `Launching ${component.name} System...`,
      `Accessing ${component.name} Interface...`,
      `Loading ${component.name} Dashboard...`,
    ];

    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];
    setTypewriterText(randomMessage);
    setShowTypewriter(true);

    // Calculate delay based on message length (1-3 seconds)
    const typingDuration = randomMessage.length * 40; // 40ms per character
    const totalDelay = typingDuration + 1200; // Add 1.2s pause after typing completes

    // Navigate to planet detail page after delay
    navigationTimeoutRef.current = setTimeout(() => {
      navigate(`/planet/${component.id}`);
    }, totalDelay);
  };

  const handleEnterModule = () => {
    if (selectedComponent) {
      // Show typewriter before navigating
      const messages = [
        `Initializing ${selectedComponent.name} Module...`,
        `Launching ${selectedComponent.name} System...`,
        `Accessing ${selectedComponent.name} Interface...`,
      ];

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setTypewriterText(randomMessage);
      setShowTypewriter(true);
      setSelectedComponent(null); // Close the panel

      const typingDuration = randomMessage.length * 40;
      const totalDelay = typingDuration + 1200;

      setTimeout(() => {
        navigate(`/planet/${selectedComponent.id}`);
      }, totalDelay);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWazuhData((prev) => ({
        alerts: {
          critical: Math.max(
            0,
            prev.alerts.critical +
              Math.floor(Math.random() * 3 - 1),
          ),
          high: Math.max(
            0,
            prev.alerts.high +
              Math.floor(Math.random() * 5 - 2),
          ),
          medium: Math.max(
            0,
            prev.alerts.medium +
              Math.floor(Math.random() * 10 - 5),
          ),
          low: Math.max(
            0,
            prev.alerts.low +
              Math.floor(Math.random() * 20 - 10),
          ),
        },
        agents: prev.agents,
        events: prev.events + Math.floor(Math.random() * 100),
        compliance: prev.compliance,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Cleanup navigation timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dark Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-[#000000]">
        {/* Subtle deep space nebula glow */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-gradient-radial from-purple-900/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[700px] h-[700px] bg-gradient-radial from-blue-900/8 via-transparent to-transparent blur-3xl" />

        {/* Animated starfield */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                opacity: [
                  Math.random() * 0.5 + 0.2,
                  Math.random() * 0.8 + 0.2,
                  Math.random() * 0.5 + 0.2,
                ],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Faint holographic sci-fi HUD lines */}
        <div className="absolute inset-0 opacity-5">
          {/* Horizontal lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              style={{ left: `${20 + i * 15}%` }}
            />
          ))}
        </div>
      </div>

      {/* Deep Blue Pulsating Radiation from Core */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="absolute w-[900px] h-[900px] bg-blue-600/20 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[150px]"
          animate={{
            scale: [1.08, 1, 1.08],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Typewriter Animation Overlay */}
      <AnimatePresence>
        {showTypewriter && (
          <TypewriterLoader
            text={typewriterText}
            onComplete={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Header - Clean Minimal Design */}
      <div
        className="absolute top-0 left-0 right-0 z-30"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl" />
              <Shield
                className="relative w-10 h-10 text-cyan-400"
                strokeWidth={1.5}
              />
            </motion.div>
            <div>
              <h1 className="text-2xl font-['Michroma'] tracking-[0.35em] bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                IMPERIUM TECH
              </h1>
              <p className="text-white/50 text-xs font-['Michroma'] tracking-[0.2em] mt-0.5">
                SECURITY OPERATIONS CENTER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              <span className="text-sm font-['Michroma'] tracking-wider">
                OPERATIONAL
              </span>
            </div>
            <div className="text-white/60 text-sm font-['Michroma'] tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Solar System Container - Perfectly Centered with Full Visibility */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ padding: "100px 60px 80px 60px" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: "min(1000px, 100%)",
              height: "min(1000px, 100%)",
              aspectRatio: "1 / 1",
            }}
          >
            {/* Central Wazuh Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div className="relative">
                {/* Core Glassmorphic Sphere */}
                <motion.div
                  className="relative rounded-full border border-white/20"
                  style={{
                    width: "120px",
                    height: "120px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(30px)",
                    boxShadow:
                      "inset 15px 15px 30px rgba(255,255,255,0.08), 0 0 80px rgba(6, 182, 212, 0.4)",
                  }}
                  animate={{
                    boxShadow: [
                      "inset 15px 15px 30px rgba(255,255,255,0.08), 0 0 80px rgba(6, 182, 212, 0.4)",
                      "inset 15px 15px 30px rgba(255,255,255,0.12), 0 0 100px rgba(6, 182, 212, 0.6)",
                      "inset 15px 15px 30px rgba(255,255,255,0.08), 0 0 80px rgba(6, 182, 212, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield
                      className="w-14 h-14 text-white/90"
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>

                {/* Orbiting Rings */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-32 h-32 border border-cyan-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-40 h-40 border border-blue-400/10 rounded-full -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Core Label */}
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <p className="text-white font-['Michroma'] tracking-[0.2em] text-sm">
                  IMPERIUM CORE
                </p>
              </div>
            </div>

            {/* Orbiting Planets */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {components.map((component) => {
                // Create horizontally stretched elliptical orbits
                // Semi-major axis (horizontal) is 1.6x the base radius for wide screen usage
                // Semi-minor axis (vertical) is the base radius
                const semiMajorAxis =
                  component.orbitRadius * 1.6;
                const semiMinorAxis = component.orbitRadius;

                // Generate smooth elliptical path using parametric equations
                // x = a * cos(t), y = b * sin(t)
                const numPoints = 60;
                const ellipsePath: { x: number; y: number }[] =
                  [];

                for (let i = 0; i <= numPoints; i++) {
                  const angle = (i / numPoints) * 2 * Math.PI;
                  ellipsePath.push({
                    x: semiMajorAxis * Math.cos(angle),
                    y: semiMinorAxis * Math.sin(angle),
                  });
                }

                // Calculate initial position based on initialPhase
                const initialAngle =
                  (component.initialPhase / 360) * 2 * Math.PI;
                const initialX =
                  semiMajorAxis * Math.cos(initialAngle);
                const initialY =
                  semiMinorAxis * Math.sin(initialAngle);

                return (
                  <div key={component.id}>
                    {/* Elliptical Orbit Path */}
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        width: semiMajorAxis * 2,
                        height: semiMinorAxis * 2,
                        overflow: "visible",
                      }}
                    >
                      <ellipse
                        cx={semiMajorAxis}
                        cy={semiMinorAxis}
                        rx={semiMajorAxis}
                        ry={semiMinorAxis}
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.2)"
                        strokeWidth="1.5"
                        style={{
                          filter:
                            "drop-shadow(0 0 15px rgba(6, 182, 212, 0.15))",
                        }}
                      />
                    </svg>

                    {/* Planet moving along elliptical path */}
                    <motion.div
                      className="absolute top-1/2 left-1/2"
                      style={{
                        x: initialX,
                        y: initialY,
                        zIndex: hoveredPlanetId === component.id ? 50 : 10,
                      }}
                      animate={{
                        x: ellipsePath.map((p) => p.x),
                        y: ellipsePath.map((p) => p.y),
                        opacity: hoveredPlanetId && hoveredPlanetId !== component.id ? 0.7 : 1,
                      }}
                      transition={{
                        duration: component.orbitSpeed,
                        repeat: Infinity,
                        ease: "linear",
                        opacity: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <motion.div
                        className="cursor-pointer relative -translate-x-1/2 -translate-y-1/2"
                        animate={{
                          scale: hoveredPlanetId === component.id ? 1.1 : 1,
                          y: hoveredPlanetId === component.id ? -20 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() =>
                          handlePlanetClick(component)
                        }
                        onMouseEnter={() => setHoveredPlanetId(component.id)}
                        onMouseLeave={() => setHoveredPlanetId(null)}
                      >
                        {/* Subtle glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-2xl -z-10"
                          style={{
                            width: component.size,
                            height: component.size,
                          }}
                          animate={{
                            background: hoveredPlanetId === component.id
                              ? `radial-gradient(circle, rgba(6, 182, 212, 0.5), transparent)`
                              : `radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent)`,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />

                        {/* Glassmorphic Planet */}
                        <div
                          className="relative rounded-full border border-white/20 transition-all duration-300"
                          style={{
                            width: component.size,
                            height: component.size,
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
                            backdropFilter: "blur(25px)",
                            boxShadow:
                              "inset 8px 8px 16px rgba(255,255,255,0.08), 0 0 30px rgba(6, 182, 212, 0.15)",
                          }}
                        >
                          {/* Reflection highlight */}
                          <div
                            className="absolute top-[15%] left-[20%] w-[30%] h-[30%] rounded-full"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(255,255,255,0.25), transparent)",
                            }}
                          />

                          {/* Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <component.icon
                              className="text-white/90"
                              style={{
                                width: component.size * 0.4,
                                height: component.size * 0.4,
                              }}
                              strokeWidth={1.5}
                            />
                          </div>

                          {/* Notification Badge */}
                          {component.id === "vulnerability" && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                boxShadow:
                                  "0 0 15px rgba(239,68,68,0.6)",
                              }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                            >
                              8
                            </motion.div>
                          )}
                        </div>

                        {/* Static Horizontal Label - Glass Badge */}
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap pointer-events-none px-3 py-1 rounded-full border border-white/10"
                          style={{
                            top: component.size + 10,
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                            backdropFilter: "blur(10px)",
                          }}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{
                            opacity: hoveredPlanetId === component.id ? 1 : 0,
                            y: hoveredPlanetId === component.id ? 0 : -5,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <p
                            className="text-white font-['Michroma'] tracking-[0.15em]"
                            style={{ fontSize: "10px" }}
                          >
                            {component.name}
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel - Glassmorphic */}
      <AnimatePresence>
        {selectedComponent && !showTypewriter && (
          <motion.div
            className="fixed right-0 top-0 h-full w-[30%] min-w-[400px] border-l border-white/10 p-8 shadow-2xl z-40 flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "inset 1px 0 0 rgba(255,255,255,0.1), -20px 0 60px rgba(0,0,0,0.5)",
            }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedComponent(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <div>
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl border border-white/20 flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "inset 5px 5px 10px rgba(255,255,255,0.08)",
                  }}
                >
                  <selectedComponent.icon
                    className="w-8 h-8 text-white/90"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-['Michroma'] tracking-wider text-white mb-1">
                    {selectedComponent.name}
                  </h3>
                  <p
                    className="text-white/60 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {selectedComponent.description}
                  </p>
                </div>
              </div>

              {/* Overview Bullets */}
              <div className="space-y-3 mb-8">
                {selectedComponent.overview.map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <p
                        className="text-white/80 text-sm leading-relaxed"
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {item}
                      </p>
                    </motion.div>
                  ),
                )}
              </div>

              {/* Enter Module Button */}
              <motion.button
                onClick={handleEnterModule}
                className="w-full py-3.5 rounded-xl border border-white/20 text-white font-medium text-base transition-all duration-300 relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    "0 0 30px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative tracking-wide">
                  Enter Module
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}