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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ModuleLoadingScreen } from "./ModuleLoadingScreen";

const moduleConfigs = {
  fim: {
    name: "FIM",
    fullName: "File Integrity Monitoring",
    icon: FileSearch,
    stats: [
      { label: "Monitored Agents", value: "156", icon: FileSearch, trend: "+12" },
      { label: "Changes Detected", value: "23", icon: Activity, trend: "-8%" },
      { label: "Critical Alerts", value: "5", icon: AlertTriangle, trend: "+2%" },
      { label: "System Status", value: "Active", icon: CheckCircle, trend: "100%" },
    ],
    chartData: [
      { name: "Added", value: 145, fill: "#00FF88" },
      { name: "Modified", value: 89, fill: "#FFAA00" },
      { name: "Deleted", value: 34, fill: "#FF4444" },
    ],
    recentEvents: [
      {
        time: "2024-03-04 14:23:45",
        agentName: "web-server-01",
        path: "/etc/nginx/nginx.conf",
        description: "File modified - Configuration update detected",
        severity: "high",
      },
      {
        time: "2024-03-04 14:18:12",
        agentName: "app-server-03",
        path: "/usr/bin/docker",
        description: "Binary file updated - System package upgrade",
        severity: "medium",
      },
      {
        time: "2024-03-04 14:05:33",
        agentName: "web-server-01",
        path: "/var/www/html/index.php",
        description: "Permission change detected - Security modification",
        severity: "high",
      },
      {
        time: "2024-03-04 13:52:08",
        agentName: "app-server-03",
        path: "/opt/app/config.yaml",
        description: "New file created - Application configuration added",
        severity: "low",
      },
      {
        time: "2024-03-04 13:34:22",
        agentName: "web-server-01",
        path: "/tmp/cache/session_data",
        description: "File deletion - Temporary data cleanup",
        severity: "low",
      },
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
    fullName: "ULM Master Engine v2.0 – Dual Source",
    icon: Database,
    logDistribution: [
      { name: "Windows", value: 28 },
      { name: "Linux", value: 35 },
      { name: "Mac", value: 12 },
      { name: "Firewall", value: 15 },
      { name: "Antivirus", value: 10 },
    ],
    severityLevels: [
      { name: "Error", value: 35, fill: "#FF4444" },
      { name: "Warning", value: 65, fill: "#FFD700" },
    ],
    recentEvents: [
      { 
        timestamp: "2024-03-05 14:45:32", 
        sourceIp: "192.168.1.45", 
        source: "Linux", 
        level: "Error", 
        message: "Failed authentication attempt detected" 
      },
      { 
        timestamp: "2024-03-05 14:45:28", 
        sourceIp: "10.0.0.23", 
        source: "Windows", 
        level: "Warning", 
        message: "High CPU usage threshold exceeded" 
      },
      { 
        timestamp: "2024-03-05 14:45:25", 
        sourceIp: "172.16.0.8", 
        source: "Firewall", 
        level: "Error", 
        message: "Unauthorized access attempt blocked" 
      },
      { 
        timestamp: "2024-03-05 14:45:21", 
        sourceIp: "192.168.1.88", 
        source: "Mac", 
        level: "Warning", 
        message: "System update pending - security patch available" 
      },
      { 
        timestamp: "2024-03-05 14:45:18", 
        sourceIp: "10.0.5.102", 
        source: "Antivirus", 
        level: "Error", 
        message: "Malware detected and quarantined" 
      },
      { 
        timestamp: "2024-03-05 14:45:15", 
        sourceIp: "192.168.2.33", 
        source: "Linux", 
        level: "Warning", 
        message: "Disk space usage above 80%" 
      },
      { 
        timestamp: "2024-03-05 14:45:12", 
        sourceIp: "10.0.0.67", 
        source: "Windows", 
        level: "Error", 
        message: "Service stopped unexpectedly - Critical service failure" 
      },
      { 
        timestamp: "2024-03-05 14:45:09", 
        sourceIp: "172.16.0.15", 
        source: "Firewall", 
        level: "Warning", 
        message: "Port scan detected from external IP" 
      },
      { 
        timestamp: "2024-03-05 14:45:06", 
        sourceIp: "192.168.1.102", 
        source: "Linux", 
        level: "Error", 
        message: "Database connection pool exhausted" 
      },
      { 
        timestamp: "2024-03-05 14:45:03", 
        sourceIp: "10.0.5.45", 
        source: "Antivirus", 
        level: "Warning", 
        message: "Definition update required" 
      },
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
    ruleLevelByTactic: [
      { name: "Initial Access - Critical", value: 8, fill: "#FF4444" },
      { name: "Execution - High", value: 15, fill: "#FF8800" },
      { name: "Persistence - Medium", value: 12, fill: "#FFAA00" },
      { name: "Privilege Escalation - High", value: 10, fill: "#FF8800" },
      { name: "Defense Evasion - Critical", value: 18, fill: "#FF4444" },
      { name: "Credential Access - Medium", value: 7, fill: "#FFAA00" },
    ],
    mitreByTactic: [
      { name: "Initial Access", value: 12, fill: "#00FF88" },
      { name: "Execution", value: 18, fill: "#00D9FF" },
      { name: "Persistence", value: 15, fill: "#FF00FF" },
      { name: "Privilege Escalation", value: 8, fill: "#FFAA00" },
      { name: "Defense Evasion", value: 22, fill: "#FF4444" },
      { name: "Credential Access", value: 10, fill: "#8844FF" },
      { name: "Discovery", value: 14, fill: "#44FF88" },
      { name: "Lateral Movement", value: 9, fill: "#FF8844" },
    ],
    recentEvents: [
      { 
        timestamp: "2024-03-05 14:45:32", 
        agentName: "srv-web-03", 
        ruleName: "T1059.001: PowerShell execution detected",
        severity: "High"
      },
      { 
        timestamp: "2024-03-05 14:42:15", 
        agentName: "workstation-089", 
        ruleName: "T1548.002: Bypass UAC detected",
        severity: "High"
      },
      { 
        timestamp: "2024-03-05 14:38:47", 
        agentName: "DC-01", 
        ruleName: "T1003.001: LSASS memory dumping attempt",
        severity: "Critical"
      },
      { 
        timestamp: "2024-03-05 14:35:22", 
        agentName: "endpoint-042", 
        ruleName: "T1021.002: SMB/Windows Admin Shares lateral movement",
        severity: "High"
      },
      { 
        timestamp: "2024-03-05 14:32:10", 
        agentName: "srv-db-02", 
        ruleName: "T1070.004: File deletion activity mapped to Defense Evasion",
        severity: "Medium"
      },
      { 
        timestamp: "2024-03-05 14:28:55", 
        agentName: "workstation-123", 
        ruleName: "T1055.001: Process injection detected",
        severity: "Critical"
      },
      { 
        timestamp: "2024-03-05 14:25:40", 
        agentName: "srv-mail-01", 
        ruleName: "T1566.001: Spearphishing attachment detected",
        severity: "High"
      },
      { 
        timestamp: "2024-03-05 14:22:18", 
        agentName: "endpoint-078", 
        ruleName: "T1136.001: Local account creation",
        severity: "Medium"
      },
      { 
        timestamp: "2024-03-05 14:18:33", 
        agentName: "srv-web-05", 
        ruleName: "T1190: Exploit public-facing application",
        severity: "Critical"
      },
      { 
        timestamp: "2024-03-05 14:15:07", 
        agentName: "workstation-045", 
        ruleName: "T1082: System information discovery",
        severity: "Low"
      },
    ],
  },
};

export function ModuleDashboard() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [timePeriod, setTimePeriod] = useState("Last 24 hours");
  const [ulmTimePeriod, setUlmTimePeriod] = useState("Last 5 minutes");
  const [refreshInterval, setRefreshInterval] = useState("10 sec");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

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

                {/* Live status indicator / ULM-specific controls */}
                {moduleId === "ulm" ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl">
                      <span className="font-['Michroma'] text-sm tracking-wider text-white/60">
                        STATUS:
                      </span>
                      <span className="font-['Michroma'] text-sm tracking-wider text-[#00FF88]">
                        🟢 CONNECTED
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl">
                      <span className="font-['Michroma'] text-xs tracking-wider text-white/60">
                        REFRESH:
                      </span>
                      <select 
                        value={refreshInterval}
                        onChange={(e) => setRefreshInterval(e.target.value)}
                        className="bg-transparent text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none cursor-pointer"
                      >
                        <option className="bg-black" value="5 sec">5 sec</option>
                        <option className="bg-black" value="10 sec">10 sec</option>
                        <option className="bg-black" value="30 sec">30 sec</option>
                        <option className="bg-black" value="1 min">1 min</option>
                      </select>
                    </div>
                  </div>
                ) : (
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
                )}
              </motion.div>

              {/* Stats Grid - ULM and MITRE have custom layouts */}
              {moduleId === "ulm" ? (
                <motion.div
                  className="grid grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Card 1: Log Distribution - Bar Chart */}
                  <motion.div
                    className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-['Michroma'] tracking-widest text-white/80 text-sm mb-6">
                      LOG DISTRIBUTION
                    </h3>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={config.logDistribution}
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 136, 0.1)" />
                          <XAxis 
                            dataKey="name" 
                            stroke="#00FF88" 
                            tick={{ fill: '#00FF88', fontSize: 12 }}
                            tickLine={{ stroke: '#00FF88', opacity: 0.3 }}
                          />
                          <YAxis 
                            stroke="#00FF88" 
                            tick={{ fill: '#00FF88', fontSize: 12 }}
                            tickLine={{ stroke: '#00FF88', opacity: 0.3 }}
                            label={{ 
                              value: 'Log Count', 
                              angle: -90, 
                              position: 'insideLeft',
                              style: { fill: '#00FF88', fontSize: 12, opacity: 0.7 }
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.95)",
                              border: "1px solid rgba(0, 255, 136, 0.4)",
                              borderRadius: "12px",
                              boxShadow: "0 0 25px rgba(0, 255, 136, 0.3)",
                              fontFamily: "Michroma",
                            }}
                            labelStyle={{ color: "#00FF88", fontWeight: "bold", marginBottom: "8px" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value: any) => [`${value} logs`, "Count"]}
                          />
                          <Bar 
                            dataKey="value" 
                            radius={[8, 8, 0, 0]}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          >
                            {config.logDistribution.map((entry: any, index: number) => {
                              const colors = [
                                "#00D9FF", // Windows - Cyan
                                "#00FF88", // Linux - Neon Green
                                "#FF00FF", // Mac - Magenta
                                "#FFAA00", // Firewall - Orange
                                "#FF4444", // Antivirus - Red
                              ];
                              return (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={colors[index]}
                                  style={{
                                    filter: `drop-shadow(0 0 10px ${colors[index]})`,
                                  }}
                                />
                              );
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Card 2: Severity Levels - Enhanced Pie Chart */}
                  <motion.div
                    className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="font-['Michroma'] tracking-widest text-white/80 text-sm mb-6">
                      SEVERITY LEVELS
                    </h3>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            {config.severityLevels.map((entry: any, index: number) => (
                              <filter key={`glow-${index}`} id={`glow-${entry.name}`} x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            ))}
                          </defs>
                          <Pie
                            data={config.severityLevels}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={95}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                            strokeWidth={3}
                            stroke="rgba(0, 0, 0, 0.6)"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            labelLine={{
                              stroke: "#00FF88",
                              strokeWidth: 1,
                              opacity: 0.5,
                            }}
                          >
                            {config.severityLevels.map((entry: any, index: number) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.fill}
                                style={{
                                  filter: `drop-shadow(0 0 10px ${entry.fill})`,
                                }}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.95)",
                              border: "1px solid rgba(0, 255, 136, 0.4)",
                              borderRadius: "12px",
                              boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
                              fontFamily: "Michroma",
                            }}
                            labelStyle={{ color: "#00FF88", fontWeight: "bold" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value: any) => [`${value} events`, "Count"]}
                          />
                          <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            iconType="circle"
                            wrapperStyle={{
                              fontSize: "13px",
                              color: "#fff",
                              fontFamily: "Michroma",
                              paddingTop: "20px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              ) : moduleId === "mitre" ? (
                <motion.div
                  className="grid grid-cols-2 gap-6 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Chart 1: Rule Level by Tactic */}
                  <motion.div
                    className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-['Michroma'] tracking-widest text-white/80 text-sm mb-4">
                      RULE LEVEL BY TACTIC
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={config.ruleLevelByTactic}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {config.ruleLevelByTactic.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
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
                          <Legend
                            verticalAlign="bottom"
                            height={60}
                            wrapperStyle={{
                              fontFamily: "Michroma",
                              fontSize: "10px",
                              color: "#fff",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Chart 2: MITRE ATT&CK by Tactic */}
                  <motion.div
                    className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="font-['Michroma'] tracking-widest text-white/80 text-sm mb-4">
                      MITRE ATT&CK BY TACTIC
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={config.mitreByTactic}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {config.mitreByTactic.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
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
                          <Legend
                            verticalAlign="bottom"
                            height={60}
                            wrapperStyle={{
                              fontFamily: "Michroma",
                              fontSize: "10px",
                              color: "#fff",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-4 gap-6 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                {config.stats.map((stat, index) => {
                  // Determine click handler for FIM cards
                  let handleClick: (() => void) | undefined = undefined;
                  if (moduleId === "fim") {
                    if (stat.label === "Monitored Agents") {
                      handleClick = () => navigate("/fim/monitored-agents");
                    } else if (stat.label === "Changes Detected") {
                      handleClick = () => navigate("/fim/changes-detected");
                    } else if (stat.label === "Critical Alerts") {
                      handleClick = () => navigate("/fim/critical-alerts");
                    }
                  }

                  return (
                    <motion.div
                      key={index}
                      className={`group relative p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl hover:bg-[#00FF88]/5 transition-all duration-300 ${
                        handleClick ? "cursor-pointer" : ""
                      }`}
                      style={{
                        boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
                      }}
                      whileHover={{
                        boxShadow: "0 0 40px rgba(0, 255, 136, 0.15)",
                      }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      onClick={handleClick}
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
                  );
                })}
                </motion.div>
              )}

              {/* Main Content Grid - Skip for ULM and MITRE as they have custom layouts */}
              {moduleId !== "ulm" && moduleId !== "mitre" && (
              <div className={`grid ${moduleId === "fim" ? "grid-cols-1" : "grid-cols-3"} gap-6 mb-8`}>
                {/* Chart Section - Takes 2 columns for non-FIM, full width for FIM */}
                <motion.div
                  className={moduleId === "fim" ? "col-span-1" : "col-span-2"}
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 255, 136, 0.2)",
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(40px)",
                    boxShadow: "0 0 40px rgba(0, 255, 136, 0.08)",
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-['Michroma'] tracking-widest text-white/80 text-sm">
                      {moduleId === "fim" ? "ACTIONS" : "ANALYTICS OVERVIEW"}
                    </h2>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 transition-colors">
                        <Filter className="w-4 h-4 text-[#00FF88]" />
                      </button>
                    </div>
                  </div>

                  <div className="h-[300px]">
                    {moduleId === "fim" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={config.chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {config.chartData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
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
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{
                              fontFamily: "Michroma",
                              fontSize: "12px",
                              color: "#fff",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}

                    {(moduleId === "ulm" || moduleId === "threat-hunting") && (
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
                            dataKey={moduleId === "ulm" ? "time" : "week"} 
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
                            dataKey={moduleId === "ulm" ? "logs" : "hunts"}
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

                {/* Quick Actions - Takes 1 column - Not shown for FIM */}
                {moduleId !== "fim" && (
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
                )}
              </div>
              )}

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
                    {moduleId === "ulm" ? "REAL-TIME SECURITY LOGS" : moduleId === "mitre" ? "EVENTS" : "RECENT EVENTS"}
                  </h2>
                  <div className="flex items-center gap-3">
                    {(moduleId === "fim" || moduleId === "mitre" || moduleId === "ulm") && (
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-xs font-['Michroma'] tracking-wider">
                          TIME PERIOD:
                        </span>
                        <select 
                          value={moduleId === "ulm" ? ulmTimePeriod : timePeriod}
                          onChange={(e) => moduleId === "ulm" ? setUlmTimePeriod(e.target.value) : setTimePeriod(e.target.value)}
                          className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-black/60 text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none focus:border-[#00FF88]/40 transition-colors"
                        >
                          <option>Last 5 minutes</option>
                          <option>Last 15 minutes</option>
                          <option>Last 1 hour</option>
                          <option>Last 24 hours</option>
                        </select>
                      </div>
                    )}
                    <button 
                      onClick={() => {
                        if (moduleId === "ulm") {
                          setShowPagination(!showPagination);
                          setCurrentPage(1);
                        }
                      }}
                      className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 transition-colors"
                    >
                      <span className="font-['Michroma'] text-xs tracking-wider text-[#00FF88]">
                        {showPagination && moduleId === "ulm" ? "COLLAPSE" : "VIEW ALL"}
                      </span>
                    </button>
                  </div>
                </div>

                {moduleId === "fim" ? (
                  // Table format for FIM module
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#00FF88]/20">
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Timestamp
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Agent Name
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            syscheck.path
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            rule.description
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Severity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {config.recentEvents.map((event: any, index: number) => (
                          <motion.tr
                            key={index}
                            className="border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                          >
                            <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                              {event.time}
                            </td>
                            <td className="py-4 px-4 text-white/70 text-sm font-['Michroma'] tracking-wide">
                              {event.agentName}
                            </td>
                            <td className="py-4 px-4 text-white/80 text-sm font-mono">
                              {event.path}
                            </td>
                            <td className="py-4 px-4 text-white/70 text-sm">
                              {event.description}
                            </td>
                            <td className="py-4 px-4">
                              <span
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
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : moduleId === "mitre" ? (
                  // Table format for MITRE module
                  <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-black/80 backdrop-blur-xl">
                        <tr className="border-b border-[#00FF88]/20">
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Timestamp
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Agent Name
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Rule Name
                          </th>
                          <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                            Severity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {config.recentEvents.map((event: any, index: number) => {
                          const getSeverityStyle = (severity: string) => {
                            switch (severity.toLowerCase()) {
                              case "critical":
                                return "bg-red-500/10 text-red-400 border border-red-500/20";
                              case "high":
                                return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
                              case "medium":
                                return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
                              case "low":
                                return "bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20";
                              default:
                                return "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20";
                            }
                          };

                          return (
                            <motion.tr
                              key={index}
                              className={`border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors ${
                                index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                              }`}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                            >
                              <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                                {event.timestamp}
                              </td>
                              <td className="py-4 px-4 text-white/70 text-sm font-['Michroma'] tracking-wide">
                                {event.agentName}
                              </td>
                              <td className="py-4 px-4 text-white/80 text-sm">
                                {event.ruleName}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${getSeverityStyle(event.severity)}`}
                                >
                                  {event.severity.toUpperCase()}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : moduleId === "ulm" ? (
                  // Table format for ULM module - Real-Time Security Logs
                  <>
                    <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-black/80 backdrop-blur-xl">
                          <tr className="border-b border-[#00FF88]/20">
                            <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                              Timestamp
                            </th>
                            <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                              Source IP
                            </th>
                            <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                              Source
                            </th>
                            <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                              Level
                            </th>
                            <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                              Message Summary
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const startIndex = showPagination ? (currentPage - 1) * itemsPerPage : 0;
                            const endIndex = showPagination ? startIndex + itemsPerPage : 5;
                            const displayEvents = config.recentEvents.slice(startIndex, endIndex);
                            
                            return displayEvents.map((event: any, index: number) => {
                          const getSourceColor = (source: string) => {
                            switch (source) {
                              case "Linux":
                                return "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20";
                              case "Windows":
                                return "bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20";
                              case "Mac":
                                return "bg-[#FF00FF]/10 text-[#FF00FF] border border-[#FF00FF]/20";
                              case "Firewall":
                                return "bg-[#FFAA00]/10 text-[#FFAA00] border border-[#FFAA00]/20";
                              case "Antivirus":
                                return "bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20";
                              default:
                                return "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20";
                            }
                          };

                          const getLevelColor = (level: string) => {
                            switch (level.toLowerCase()) {
                              case "error":
                                return "text-red-400";
                              case "warning":
                                return "text-yellow-400";
                              default:
                                return "text-[#00FF88]";
                            }
                          };

                          return (
                            <motion.tr
                              key={index}
                              className={`border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors ${
                                index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                              }`}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                            >
                              <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                                {event.timestamp}
                              </td>
                              <td className="py-4 px-4 text-white/70 text-sm font-mono">
                                {event.sourceIp}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${getSourceColor(event.source)}`}
                                >
                                  {event.source.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`text-sm font-['Michroma'] tracking-wider ${getLevelColor(event.level)}`}>
                                  {event.level.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-white/70 text-sm">
                                {event.message}
                              </td>
                            </motion.tr>
                          );
                        });
                          })()}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination Controls */}
                  {showPagination && (
                    <div className="flex items-center justify-end gap-2 mt-6">
                      <span className="text-white/50 text-xs font-['Michroma'] tracking-wider mr-4">
                        Page {currentPage} of {Math.ceil(config.recentEvents.length / itemsPerPage)}
                      </span>
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="font-['Michroma'] text-xs tracking-wider text-[#00FF88]">
                          PREV
                        </span>
                      </button>
                      {Array.from({ length: Math.ceil(config.recentEvents.length / itemsPerPage) }, (_, i) => i + 1)
                        .slice(Math.max(0, currentPage - 2), Math.min(Math.ceil(config.recentEvents.length / itemsPerPage), currentPage + 1))
                        .map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              currentPage === page
                                ? "border-[#00FF88]/40 bg-[#00FF88]/15 text-[#00FF88]"
                                : "border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 text-white/70"
                            }`}
                          >
                            <span className="font-['Michroma'] text-xs tracking-wider">
                              {page}
                            </span>
                          </button>
                        ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(Math.ceil(config.recentEvents.length / itemsPerPage), currentPage + 1))}
                        disabled={currentPage === Math.ceil(config.recentEvents.length / itemsPerPage)}
                        className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="font-['Michroma'] text-xs tracking-wider text-[#00FF88]">
                          NEXT
                        </span>
                      </button>
                    </div>
                  )}
                  </>
                ) : (
                  // Card format for other modules
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
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}