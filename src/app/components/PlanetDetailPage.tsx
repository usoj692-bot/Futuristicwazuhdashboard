import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, FileSearch, Bug, Database, Brain, Crosshair, Target } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

const planetConfigs = {
  fim: {
    name: "FIM",
    fullName: "File Integrity Monitoring",
    icon: FileSearch,
    color: "from-blue-500 to-cyan-500",
    description: "Real-time file system monitoring and change detection",
    metrics: [
      { label: "Monitored Files", value: "2,450" },
      { label: "Changes Detected", value: "23" },
      { label: "Alerts Today", value: "5" },
      { label: "System Status", value: "Active" },
    ],
    recentActivity: [
      { time: "2 min ago", event: "Config file modified: /etc/nginx/nginx.conf" },
      { time: "5 min ago", event: "Binary file updated: /usr/bin/docker" },
      { time: "12 min ago", event: "Permission change detected: /var/www/html" },
      { time: "23 min ago", event: "New file created: /opt/app/config.yaml" },
    ],
  },
  vulnerability: {
    name: "VULNERABILITY",
    fullName: "Vulnerability Detection",
    icon: Bug,
    color: "from-red-500 to-orange-500",
    description: "Automated vulnerability scanning and assessment",
    metrics: [
      { label: "Critical", value: "8" },
      { label: "High", value: "34" },
      { label: "Medium", value: "127" },
      { label: "Low", value: "456" },
    ],
    recentActivity: [
      { time: "1 hour ago", event: "CVE-2024-1234: Critical OpenSSL vulnerability detected" },
      { time: "2 hours ago", event: "CVE-2024-5678: High severity kernel vulnerability" },
      { time: "3 hours ago", event: "Package update required: nginx 1.20.0 → 1.24.0" },
      { time: "5 hours ago", event: "Scan completed: 156 agents, 625 vulnerabilities found" },
    ],
  },
  ulm: {
    name: "ULM",
    fullName: "Unified Log Management",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    description: "Centralized log collection and analysis platform",
    metrics: [
      { label: "Logs Collected", value: "1.2M/day" },
      { label: "Active Sources", value: "48" },
      { label: "Storage Used", value: "2.4TB" },
      { label: "Retention Period", value: "90 days" },
    ],
    recentActivity: [
      { time: "Just now", event: "High volume of failed SSH attempts from 185.220.101.x" },
      { time: "3 min ago", event: "Database connection spike detected on prod-db-01" },
      { time: "8 min ago", event: "Application error rate increased by 15%" },
      { time: "15 min ago", event: "Log source connected: web-server-12" },
    ],
  },
  predictive: {
    name: "PREDICTIVE",
    fullName: "Predictive Analysis",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    description: "AI-powered threat prediction and behavioral analysis",
    metrics: [
      { label: "Threats Predicted", value: "34" },
      { label: "Model Accuracy", value: "94.5%" },
      { label: "Model Version", value: "v2.1" },
      { label: "Last Updated", value: "1 hour ago" },
    ],
    recentActivity: [
      { time: "10 min ago", event: "Anomaly detected: Unusual network traffic pattern from 10.0.5.23" },
      { time: "25 min ago", event: "Predicted: Potential DDoS attack within next 6 hours (78% confidence)" },
      { time: "1 hour ago", event: "Behavioral baseline updated for user group: admins" },
      { time: "2 hours ago", event: "ML model retrained with 2.3M new data points" },
    ],
  },
  "threat-hunting": {
    name: "THREAT HUNTING",
    fullName: "Active Threat Hunting",
    icon: Crosshair,
    color: "from-yellow-500 to-amber-500",
    description: "Proactive threat detection and investigation",
    metrics: [
      { label: "Active Hunts", value: "12" },
      { label: "Threats Found", value: "6" },
      { label: "IOCs Tracked", value: "1,847" },
      { label: "Last Hunt", value: "30 min ago" },
    ],
    recentActivity: [
      { time: "15 min ago", event: "Hunt completed: PowerShell obfuscation techniques" },
      { time: "45 min ago", event: "IOC match found: Suspicious domain contact from endpoint-042" },
      { time: "1 hour ago", event: "New hunt initiated: Lateral movement detection" },
      { time: "2 hours ago", event: "Threat confirmed: Credential dumping attempt on DC-01" },
    ],
  },
  mitre: {
    name: "MITRE ATT&CK",
    fullName: "MITRE ATT&CK Framework",
    icon: Target,
    color: "from-indigo-500 to-violet-500",
    description: "Adversary tactics and techniques mapping",
    metrics: [
      { label: "Tactics Detected", value: "14" },
      { label: "Techniques", value: "87" },
      { label: "Coverage", value: "78%" },
      { label: "Recent TTP", value: "T1059.001" },
    ],
    recentActivity: [
      { time: "5 min ago", event: "T1059.001: PowerShell execution detected on srv-web-03" },
      { time: "20 min ago", event: "T1070.004: File deletion activity mapped to Defense Evasion" },
      { time: "1 hour ago", event: "T1021.002: SMB/Windows Admin Shares lateral movement" },
      { time: "2 hours ago", event: "T1003.001: LSASS memory dumping attempt blocked" },
    ],
  },
};

export function PlanetDetailPage() {
  const { planetId } = useParams();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  
  const config = planetConfigs[planetId as keyof typeof planetConfigs];
  
  if (!config) {
    navigate("/dashboard");
    return null;
  }

  const Icon = config.icon;

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Blue Ambient Radiation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[200px]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Return Button */}
      <motion.div
        className="absolute top-8 left-8 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-['Michroma'] tracking-widest px-6 py-6"
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          RETURN TO SOLAR SYSTEM
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Planet Header */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          {/* Glassmorphic Planet */}
          <div className="relative mb-8">
            {/* Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-full blur-3xl opacity-30`} 
                 style={{ width: "200px", height: "200px" }} />
            
            {/* Glass Planet */}
            <div
              className="relative rounded-full backdrop-blur-[40px] border border-white/20"
              style={{
                width: "160px",
                height: "160px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)",
                boxShadow: "inset 20px 20px 40px rgba(255,255,255,0.1), 0 0 60px rgba(0,100,255,0.15)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-20 h-20 text-white/90" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-['Michroma'] tracking-[0.3em] text-white mb-3">
            {config.name}
          </h1>
          <p className="text-lg text-white/60 font-['Michroma'] tracking-widest">
            {config.fullName}
          </p>
          <p className="text-sm text-white/40 mt-4 max-w-2xl text-center">
            {config.description}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-4 gap-6 mb-12 w-full max-w-5xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {config.metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-2xl backdrop-blur-[40px] border border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                boxShadow: "inset 10px 10px 20px rgba(255,255,255,0.05), 0 0 30px rgba(0,100,255,0.1)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,100,255,0.2)" }}
            >
              <p className="text-white/50 text-xs font-['Michroma'] tracking-widest mb-2">
                {metric.label.toUpperCase()}
              </p>
              <p className="text-white text-3xl font-bold">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="w-full max-w-5xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-xl font-['Michroma'] tracking-widest text-white/80 mb-4">
            RECENT ACTIVITY
          </h2>
          <div className="space-y-3">
            {config.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-xl backdrop-blur-[40px] border border-white/10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
                  boxShadow: "0 0 20px rgba(0,100,255,0.05)",
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <p className="text-white/70 text-sm flex-1">{activity.event}</p>
                  <span className="text-white/40 text-xs font-['Michroma'] tracking-wider ml-4">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}