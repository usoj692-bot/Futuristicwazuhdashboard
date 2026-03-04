import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  FileSearch,
  Bug,
  Database,
  Brain,
  Crosshair,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ModuleLoadingScreen } from "./ModuleLoadingScreen";

const moduleConfigs = {
  fim: {
    name: "FIM",
    fullName: "File Integrity Monitoring",
    icon: FileSearch,
    stats: [
      { label: "Monitored Files", value: "2,450", icon: FileSearch, trend: "+12%" },
      { label: "Changes Detected", value: "23", icon: Activity, trend: "-8%" },
      { label: "Critical Alerts", value: "5", icon: AlertTriangle, trend: "+2%" },
      { label: "System Status", value: "Active", icon: CheckCircle, trend: "100%" },
    ],
    chartData: [
      { time: "00:00", changes: 12, alerts: 2 },
      { time: "04:00", changes: 8, alerts: 1 },
      { time: "08:00", changes: 15, alerts: 3 },
      { time: "12:00", changes: 23, alerts: 5 },
      { time: "16:00", changes: 18, alerts: 4 },
      { time: "20:00", changes: 20, alerts: 3 },
      { time: "24:00", changes: 23, alerts: 5 },
    ],
    recentEvents: [
      { time: "2 min ago", event: "Config file modified: /etc/nginx/nginx.conf", severity: "high" },
      { time: "5 min ago", event: "Binary file updated: /usr/bin/docker", severity: "medium" },
      { time: "12 min ago", event: "Permission change detected: /var/www/html", severity: "high" },
      { time: "23 min ago", event: "New file created: /opt/app/config.yaml", severity: "low" },
      { time: "45 min ago", event: "File deletion: /tmp/cache/session_data", severity: "low" },
    ],
  },
  vulnerability: {
    name: "VULNERABILITY DETECTION",
    fullName: "Vulnerability Detection & Assessment",
    icon: Bug,
    stats: [
      { label: "Critical", value: "8", icon: AlertTriangle, trend: "+3" },
      { label: "High", value: "34", icon: XCircle, trend: "-2" },
      { label: "Medium", value: "127", icon: Activity, trend: "+15" },
      { label: "Low", value: "456", icon: CheckCircle, trend: "+28" },
    ],
    chartData: [
      { name: "Critical", value: 8 },
      { name: "High", value: 34 },
      { name: "Medium", value: 127 },
      { name: "Low", value: 456 },
    ],
    recentEvents: [
      { time: "1 hour ago", event: "CVE-2024-1234: Critical OpenSSL vulnerability detected", severity: "critical" },
      { time: "2 hours ago", event: "CVE-2024-5678: High severity kernel vulnerability", severity: "high" },
      { time: "3 hours ago", event: "Package update required: nginx 1.20.0 → 1.24.0", severity: "medium" },
      { time: "5 hours ago", event: "Scan completed: 156 agents, 625 vulnerabilities found", severity: "low" },
      { time: "8 hours ago", event: "CVE-2024-9012: Medium severity Apache vulnerability", severity: "medium" },
    ],
  },
  ulm: {
    name: "ULM",
    fullName: "Unified Log Management",
    icon: Database,
    stats: [
      { label: "Logs Processed", value: "1.2M", icon: Activity, trend: "+250K" },
      { label: "Active Sources", value: "48", icon: Database, trend: "+3" },
      { label: "Storage Used", value: "2.4TB", icon: TrendingUp, trend: "+180GB" },
      { label: "Data Quality", value: "98.5%", icon: CheckCircle, trend: "+0.5%" },
    ],
    chartData: [
      { time: "Mon", logs: 980000, errors: 1200 },
      { time: "Tue", logs: 1050000, errors: 1500 },
      { time: "Wed", logs: 1120000, errors: 1100 },
      { time: "Thu", logs: 1200000, errors: 1300 },
      { time: "Fri", logs: 1180000, errors: 900 },
      { time: "Sat", logs: 890000, errors: 600 },
      { time: "Sun", logs: 920000, errors: 700 },
    ],
    recentEvents: [
      { time: "Just now", event: "High volume of failed SSH attempts from 185.220.101.x", severity: "high" },
      { time: "3 min ago", event: "Database connection spike detected on prod-db-01", severity: "medium" },
      { time: "8 min ago", event: "Application error rate increased by 15%", severity: "high" },
      { time: "15 min ago", event: "Log source connected: web-server-12", severity: "low" },
      { time: "22 min ago", event: "Archive job completed: 45GB moved to cold storage", severity: "low" },
    ],
  },
  predictive: {
    name: "PREDICTIVE ANALYSIS",
    fullName: "AI-Powered Threat Prediction",
    icon: Brain,
    stats: [
      { label: "Threats Predicted", value: "34", icon: AlertTriangle, trend: "+8" },
      { label: "Model Accuracy", value: "94.5%", icon: CheckCircle, trend: "+2.1%" },
      { label: "Active Models", value: "8", icon: Brain, trend: "+1" },
      { label: "Confidence Score", value: "87%", icon: TrendingUp, trend: "+5%" },
    ],
    chartData: [
      { subject: "Malware", A: 85, fullMark: 100 },
      { subject: "Phishing", A: 92, fullMark: 100 },
      { subject: "DDoS", A: 78, fullMark: 100 },
      { subject: "Intrusion", A: 88, fullMark: 100 },
      { subject: "Data Leak", A: 94, fullMark: 100 },
      { subject: "Anomaly", A: 81, fullMark: 100 },
    ],
    recentEvents: [
      { time: "10 min ago", event: "Anomaly detected: Unusual network traffic pattern from 10.0.5.23", severity: "high" },
      { time: "25 min ago", event: "Predicted: Potential DDoS attack within next 6 hours (78% confidence)", severity: "critical" },
      { time: "1 hour ago", event: "Behavioral baseline updated for user group: admins", severity: "low" },
      { time: "2 hours ago", event: "ML model retrained with 2.3M new data points", severity: "medium" },
      { time: "3 hours ago", event: "Threat prediction accuracy improved by 2.1%", severity: "low" },
    ],
  },
  "threat-hunting": {
    name: "THREAT HUNTING",
    fullName: "Active Threat Hunting Operations",
    icon: Crosshair,
    stats: [
      { label: "Active Hunts", value: "12", icon: Crosshair, trend: "+3" },
      { label: "Threats Found", value: "6", icon: AlertTriangle, trend: "+2" },
      { label: "IOCs Tracked", value: "1,847", icon: Shield, trend: "+234" },
      { label: "Success Rate", value: "78%", icon: CheckCircle, trend: "+12%" },
    ],
    chartData: [
      { week: "W1", hunts: 8, threats: 3 },
      { week: "W2", hunts: 10, threats: 4 },
      { week: "W3", hunts: 9, threats: 2 },
      { week: "W4", hunts: 12, threats: 6 },
    ],
    recentEvents: [
      { time: "15 min ago", event: "Hunt completed: PowerShell obfuscation techniques", severity: "high" },
      { time: "45 min ago", event: "IOC match found: Suspicious domain contact from endpoint-042", severity: "critical" },
      { time: "1 hour ago", event: "New hunt initiated: Lateral movement detection", severity: "medium" },
      { time: "2 hours ago", event: "Threat confirmed: Credential dumping attempt on DC-01", severity: "critical" },
      { time: "4 hours ago", event: "Hunt query optimized: 40% performance improvement", severity: "low" },
    ],
  },
  mitre: {
    name: "MITRE ATT&CK",
    fullName: "MITRE ATT&CK Framework Mapping",
    icon: Target,
    stats: [
      { label: "Tactics Detected", value: "14", icon: Target, trend: "+2" },
      { label: "Techniques", value: "87", icon: Activity, trend: "+12" },
      { label: "Coverage", value: "78%", icon: TrendingUp, trend: "+5%" },
      { label: "Recent TTPs", value: "23", icon: AlertTriangle, trend: "+6" },
    ],
    chartData: [
      { tactic: "Initial Access", count: 12 },
      { tactic: "Execution", count: 18 },
      { tactic: "Persistence", count: 15 },
      { tactic: "Privilege Esc.", count: 8 },
      { tactic: "Defense Evasion", count: 22 },
      { tactic: "Lateral Move", count: 10 },
    ],
    recentEvents: [
      { time: "5 min ago", event: "T1059.001: PowerShell execution detected on srv-web-03", severity: "high" },
      { time: "20 min ago", event: "T1070.004: File deletion activity mapped to Defense Evasion", severity: "medium" },
      { time: "1 hour ago", event: "T1021.002: SMB/Windows Admin Shares lateral movement", severity: "high" },
      { time: "2 hours ago", event: "T1003.001: LSASS memory dumping attempt blocked", severity: "critical" },
      { time: "3 hours ago", event: "T1548.002: Bypass UAC detected on workstation-089", severity: "high" },
    ],
  },
};

export function ModuleDashboard() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const config = moduleConfigs[moduleId as keyof typeof moduleConfigs];

  if (!config) {
    navigate("/dashboard");
    return null;
  }

  const Icon = config.icon;

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      setShowDashboard(true);
    }, 50);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      default:
        return "text-[#00FF88]";
    }
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && <ModuleLoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {showDashboard && (
          <motion.div
            className="relative w-full min-h-screen overflow-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Black background with subtle gradient */}
            <div className="fixed inset-0 bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
              
              {/* Subtle grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(#00FF88 1px, transparent 1px),
                    linear-gradient(90deg, #00FF88 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Ambient green glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00FF88]/5 rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl hover:bg-[#00FF88]/5 hover:border-[#00FF88]/40 transition-all duration-300"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)",
                    }}
                  >
                    <ArrowLeft className="w-5 h-5 text-[#00FF88] group-hover:translate-x-[-4px] transition-transform" />
                    <span className="font-['Michroma'] tracking-wider text-sm text-[#00FF88]">
                      RETURN
                    </span>
                  </button>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl border border-[#00FF88]/30 flex items-center justify-center bg-black/60 backdrop-blur-xl"
                      style={{
                        boxShadow: "0 0 30px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05)",
                      }}
                    >
                      <Icon className="w-7 h-7 text-[#00FF88]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h1 className="font-['Michroma'] tracking-[0.2em] text-2xl text-white">
                        {config.name}
                      </h1>
                      <p className="text-white/40 text-sm tracking-wide mt-0.5">
                        {config.fullName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live status indicator */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-[#00FF88]"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(0, 255, 136, 0.5)",
                        "0 0 20px rgba(0, 255, 136, 0.8)",
                        "0 0 10px rgba(0, 255, 136, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-['Michroma'] text-sm tracking-wider text-[#00FF88]">
                    LIVE
                  </span>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-4 gap-6 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {config.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl hover:bg-[#00FF88]/5 transition-all duration-300"
                    style={{
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                    }}
                    whileHover={{
                      boxShadow: "0 0 40px rgba(0, 255, 136, 0.15)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <stat.icon className="w-5 h-5 text-[#00FF88]/60 group-hover:text-[#00FF88] transition-colors" strokeWidth={1.5} />
                      <span className="text-xs font-['Michroma'] tracking-wider text-[#00FF88] px-2 py-1 rounded-lg bg-[#00FF88]/10">
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs font-['Michroma'] tracking-widest mb-2 uppercase">
                      {stat.label}
                    </p>
                    <p className="text-white text-3xl font-bold tracking-wide">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Chart Section - Takes 2 columns */}
                <motion.div
                  className="col-span-2 p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                  style={{
                    boxShadow: "0 0 40px rgba(0, 255, 136, 0.08)",
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-['Michroma'] tracking-widest text-white/80 text-sm">
                      ANALYTICS OVERVIEW
                    </h2>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 transition-colors">
                        <Filter className="w-4 h-4 text-[#00FF88]" />
                      </button>
                    </div>
                  </div>

                  <div className="h-[300px]">
                    {(moduleId === "fim" || moduleId === "ulm" || moduleId === "threat-hunting") && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={config.chartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#00FF88" opacity={0.1} />
                          <XAxis 
                            dataKey={moduleId === "ulm" ? "time" : (moduleId === "threat-hunting" ? "week" : "time")} 
                            stroke="#00FF88" 
                            opacity={0.5}
                            style={{ fontSize: "12px", fontFamily: "Michroma" }}
                          />
                          <YAxis stroke="#00FF88" opacity={0.5} style={{ fontSize: "12px" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.9)",
                              border: "1px solid rgba(0, 255, 136, 0.3)",
                              borderRadius: "12px",
                              boxShadow: "0 0 20px rgba(0, 255, 136, 0.2)",
                            }}
                            labelStyle={{ color: "#00FF88", fontFamily: "Michroma" }}
                            itemStyle={{ color: "#fff" }}
                          />
                          <Area
                            type="monotone"
                            dataKey={moduleId === "ulm" ? "logs" : (moduleId === "threat-hunting" ? "hunts" : "changes")}
                            stroke="#00FF88"
                            strokeWidth={2}
                            fill="url(#colorValue)"
                          />
                          {moduleId === "ulm" && (
                            <Area
                              type="monotone"
                              dataKey="errors"
                              stroke="#FF4444"
                              strokeWidth={2}
                              fill="none"
                            />
                          )}
                          {moduleId === "threat-hunting" && (
                            <Area
                              type="monotone"
                              dataKey="threats"
                              stroke="#FFAA00"
                              strokeWidth={2}
                              fill="none"
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    )}

                    {moduleId === "vulnerability" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={config.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#00FF88" opacity={0.1} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#00FF88" 
                            opacity={0.5}
                            style={{ fontSize: "12px", fontFamily: "Michroma" }}
                          />
                          <YAxis stroke="#00FF88" opacity={0.5} style={{ fontSize: "12px" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.9)",
                              border: "1px solid rgba(0, 255, 136, 0.3)",
                              borderRadius: "12px",
                            }}
                            labelStyle={{ color: "#00FF88", fontFamily: "Michroma" }}
                          />
                          <Bar dataKey="value" fill="#00FF88" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {moduleId === "predictive" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={config.chartData}>
                          <PolarGrid stroke="#00FF88" opacity={0.2} />
                          <PolarAngleAxis 
                            dataKey="subject" 
                            stroke="#00FF88"
                            style={{ fontSize: "11px", fontFamily: "Michroma" }}
                          />
                          <PolarRadiusAxis stroke="#00FF88" opacity={0.3} />
                          <Radar
                            name="Accuracy"
                            dataKey="A"
                            stroke="#00FF88"
                            fill="#00FF88"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    )}

                    {moduleId === "mitre" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={config.chartData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" stroke="#00FF88" opacity={0.1} />
                          <XAxis type="number" stroke="#00FF88" opacity={0.5} />
                          <YAxis 
                            type="category" 
                            dataKey="tactic" 
                            stroke="#00FF88" 
                            opacity={0.5}
                            style={{ fontSize: "11px", fontFamily: "Michroma" }}
                            width={120}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.9)",
                              border: "1px solid rgba(0, 255, 136, 0.3)",
                              borderRadius: "12px",
                            }}
                          />
                          <Bar dataKey="count" fill="#00FF88" radius={[0, 8, 8, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </motion.div>

                {/* Quick Actions - Takes 1 column */}
                <motion.div
                  className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                  style={{
                    boxShadow: "0 0 40px rgba(0, 255, 136, 0.08)",
                  }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-['Michroma'] tracking-widest text-white/80 text-sm mb-6">
                    QUICK ACTIONS
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: "Run Full Scan", icon: Search },
                      { label: "Export Report", icon: TrendingUp },
                      { label: "Configure Alerts", icon: AlertTriangle },
                      { label: "View History", icon: Activity },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="group w-full flex items-center gap-3 p-4 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/40 transition-all duration-300"
                        style={{
                          boxShadow: "0 0 15px rgba(0, 255, 136, 0.05)",
                        }}
                      >
                        <action.icon className="w-5 h-5 text-[#00FF88]" strokeWidth={1.5} />
                        <span className="font-['Michroma'] text-xs tracking-wider text-white/80 group-hover:text-white">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent Events */}
              <motion.div
                className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                style={{
                  boxShadow: "0 0 40px rgba(0, 255, 136, 0.08)",
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Michroma'] tracking-widest text-white/80 text-sm">
                    RECENT EVENTS
                  </h2>
                  <button className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 transition-colors">
                    <span className="font-['Michroma'] text-xs tracking-wider text-[#00FF88]">
                      VIEW ALL
                    </span>
                  </button>
                </div>

                <div className="space-y-3">
                  {config.recentEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="group p-4 rounded-xl border border-[#00FF88]/10 bg-black/20 hover:bg-[#00FF88]/5 hover:border-[#00FF88]/20 transition-all duration-300"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className={`text-sm mb-1 ${getSeverityColor(event.severity)}`}>
                            {event.event}
                          </p>
                          <span className="text-white/40 text-xs font-['Michroma'] tracking-wider">
                            {event.time}
                          </span>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${
                            event.severity === "critical"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : event.severity === "high"
                              ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                              : event.severity === "medium"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20"
                          }`}
                        >
                          {event.severity.toUpperCase()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
