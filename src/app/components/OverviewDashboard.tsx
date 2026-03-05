import { motion } from "motion/react";
import { ArrowLeft, Shield, Monitor, Apple, Server, HardDrive } from "lucide-react";
import { useNavigate } from "react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

export function OverviewDashboard() {
  const navigate = useNavigate();

  const agentData = [
    { name: "Connected", value: 145, color: "#10b981" },
    { name: "Disconnected", value: 8, color: "#ef4444" },
    { name: "Partially Connected", value: 23, color: "#eab308" },
  ];

  const alertSeverities = [
    {
      level: "Critical",
      value: 0,
      color: "#ef4444",
    },
    {
      level: "High",
      value: 0,
      color: "#f97316",
    },
    {
      level: "Medium",
      value: 612,
      color: "#eab308",
    },
    {
      level: "Low",
      value: 430,
      color: "#06b6d4",
    },
  ];

  const logSources = [
    { name: "Windows Logs", count: 1234, icon: Monitor },
    { name: "Mac Logs", count: 567, icon: Apple },
    { name: "Linux Logs", count: 892, icon: Server },
    { name: "Antivirus Logs", count: 445, icon: Shield },
    { name: "Firewall Logs", count: 678, icon: HardDrive },
  ];

  const fimEvents = [
    { 
      timestamp: "2026-03-05 14:32:15", 
      sourceIp: "192.168.1.45", 
      event: "File Modified", 
      path: "/etc/passwd" 
    },
    { 
      timestamp: "2026-03-05 14:31:08", 
      sourceIp: "192.168.1.50", 
      event: "Permission Changed", 
      path: "/var/www/html/index.php" 
    },
    { 
      timestamp: "2026-03-05 14:30:22", 
      sourceIp: "192.168.1.102", 
      event: "File Created", 
      path: "/home/user/.ssh/authorized_keys" 
    },
    { 
      timestamp: "2026-03-05 14:29:47", 
      sourceIp: "192.168.1.33", 
      event: "File Deleted", 
      path: "/tmp/suspicious_file.exe" 
    },
    { 
      timestamp: "2026-03-05 14:28:33", 
      sourceIp: "192.168.1.78", 
      event: "Ownership Changed", 
      path: "/var/log/secure" 
    },
  ];

  const predictiveEvents = [
    { rank: 1, name: "Unauthorized SSH Attempts Spike", riskScore: 92 },
    { rank: 2, name: "Privilege Escalation Pattern Detected", riskScore: 87 },
    { rank: 3, name: "Abnormal Database Queries", riskScore: 78 },
    { rank: 4, name: "Suspicious Outbound Traffic", riskScore: 71 },
    { rank: 5, name: "Failed Login Pattern", riskScore: 65 },
  ];

  const mitreAttacks = [
    { cve: "CVE-2024-1234", ruleName: "Credential Dumping", severity: "Critical" },
    { cve: "CVE-2024-5678", ruleName: "Data Exfiltration", severity: "High" },
    { cve: "CVE-2024-9012", ruleName: "Persistence Mechanism", severity: "Medium" },
    { cve: "CVE-2024-3456", ruleName: "Lateral Movement", severity: "High" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-auto bg-black">
      {/* Black background with subtle gradient - same as Planet pages */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 px-8 py-6 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-300" />
        </button>
        <h1
          className="text-3xl"
          style={{
            fontFamily: "Michroma",
            letterSpacing: "0.2em",
            background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          OVERVIEW
        </h1>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 px-8 pb-12 space-y-8">
        {/* ROW 1: Agents Summary (Left) | Severity Cards (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Agents Summary - Left */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              AGENTS SUMMARY
            </h2>
            <motion.div
              className="rounded-2xl border p-6 relative overflow-hidden h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(30px)",
                borderColor: "rgba(6, 182, 212, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Cyber grid effect */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }} />
              </div>
              
              <div className="relative z-10">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentData} layout="horizontal">
                    <XAxis type="category" dataKey="name" stroke="#ffffff40" style={{ fontSize: "12px", fontFamily: "Michroma" }} />
                    <YAxis type="number" stroke="#ffffff40" style={{ fontSize: "12px" }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                      {agentData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{
                            filter: `drop-shadow(0 0 8px ${entry.color})`,
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Severity - Right */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              SEVERITY
            </h2>
            <div className="grid grid-cols-2 gap-4 h-full" style={{ alignContent: "start" }}>
              {alertSeverities.map((severity, index) => (
                <motion.div
                  key={severity.level}
                  className="rounded-2xl border p-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(30px)",
                    borderColor: "rgba(6, 182, 212, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ 
                        backgroundColor: severity.color,
                        boxShadow: `0 0 8px ${severity.color}`,
                      }}
                    />
                    <h3
                      className="text-white/90 text-sm"
                      style={{ fontWeight: 600, fontFamily: "Michroma" }}
                    >
                      {severity.level}
                    </h3>
                  </div>
                  <div
                    className="text-xl"
                    style={{
                      fontWeight: 600,
                      color: severity.color,
                      fontFamily: "Michroma",
                    }}
                  >
                    {severity.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ROW 2: Uniform Log Management (Left) | Recent Logs (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Uniform Log Management - Left */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              UNIFORM LOG MANAGEMENT
            </h2>
            <motion.div
              onClick={() => navigate("/module/ulm")}
              className="rounded-2xl border p-6 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(30px)",
                borderColor: "rgba(6, 182, 212, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="space-y-4">
                {logSources.map((source, index) => {
                  const Icon = source.icon;
                  return (
                    <motion.div
                      key={source.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            background: "rgba(0, 255, 136, 0.1)",
                          }}
                        >
                          <Icon className="w-4 h-4 text-[#00FF88]" />
                        </div>
                        <span className="text-white/80 text-sm" style={{ fontFamily: "Michroma" }}>
                          {source.name}
                        </span>
                      </div>
                      <span 
                        className="text-[#00FF88] font-bold text-sm"
                        style={{ fontFamily: "Michroma" }}
                      >
                        {source.count}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* File Integrity Monitoring - Right */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              FILE INTEGRITY MONITORING
            </h2>
            <motion.div
              onClick={() => navigate("/module/fim")}
              className="rounded-2xl border p-6 cursor-pointer hover:border-cyan-400/40 transition-all duration-300 h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(30px)",
                borderColor: "rgba(6, 182, 212, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        TIMESTAMP
                      </th>
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        SOURCE IP
                      </th>
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        EVENT
                      </th>
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        PATH
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fimEvents.map((event, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      >
                        <td className="py-2 text-xs text-white/70">
                          {event.timestamp}
                        </td>
                        <td className="py-2 text-xs text-cyan-400">
                          {event.sourceIp}
                        </td>
                        <td 
                          className="py-2 text-xs text-white/80"
                          style={{ fontFamily: "monospace" }}
                        >
                          {event.event}
                        </td>
                        <td 
                          className="py-2 text-xs text-white/60"
                          style={{ fontFamily: "monospace" }}
                        >
                          {event.path}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ROW 3: Predictive Analysis (Left) | MITRE ATT&CK (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Predictive Analysis */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              PREDICTIVE ANALYSIS
            </h2>
            <motion.div
              onClick={() => navigate("/module/predictive")}
              className="rounded-2xl border p-6 cursor-pointer hover:border-cyan-400/40 transition-all duration-300 h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(30px)",
                borderColor: "rgba(6, 182, 212, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 
                className="text-white/80 text-xs mb-4 tracking-wider"
                style={{ fontFamily: "Michroma" }}
              >
                TOP 5 ESCALATING EVENTS
              </h3>
              <div className="space-y-3">
                {predictiveEvents.map((event, index) => {
                  const isHighRisk = event.riskScore >= 80;
                  const isMediumRisk = event.riskScore >= 70 && event.riskScore < 80;
                  const color = isHighRisk ? "#ef4444" : isMediumRisk ? "#f97316" : "#eab308";
                  
                  return (
                    <motion.div
                      key={event.rank}
                      className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    >
                      <div 
                        className="text-lg font-bold"
                        style={{ 
                          color: color,
                          fontFamily: "Michroma",
                          minWidth: "24px",
                        }}
                      >
                        {event.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-white/80 text-sm mb-1">
                          {event.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ 
                                backgroundColor: color,
                                boxShadow: `0 0 8px ${color}`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${event.riskScore}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                          <span 
                            className="text-xs font-bold"
                            style={{ 
                              color: color,
                              fontFamily: "Michroma",
                              minWidth: "32px",
                            }}
                          >
                            {event.riskScore}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* MITRE ATT&CK */}
          <div>
            <h2
              className="text-sm mb-4 tracking-[0.3em]"
              style={{
                fontFamily: "Michroma",
                color: "#00FF88",
              }}
            >
              MITRE ATT&CK
            </h2>
            <motion.div
              onClick={() => navigate("/module/mitre")}
              className="rounded-2xl border p-6 cursor-pointer hover:border-cyan-400/40 transition-all duration-300 h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(30px)",
                borderColor: "rgba(6, 182, 212, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        CVE
                      </th>
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        RULE NAME
                      </th>
                      <th 
                        className="text-left pb-2 text-[10px] tracking-wider text-white/60"
                        style={{ fontFamily: "Michroma" }}
                      >
                        SEVERITY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mitreAttacks.map((attack, index) => {
                      const severityColor = 
                        attack.severity === "Critical" ? "#ef4444" :
                        attack.severity === "High" ? "#f97316" :
                        attack.severity === "Medium" ? "#eab308" : "#06b6d4";
                      
                      return (
                        <motion.tr
                          key={index}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        >
                          <td className="py-2 text-xs text-cyan-400">
                            {attack.cve}
                          </td>
                          <td className="py-2 text-xs text-white/80">
                            {attack.ruleName}
                          </td>
                          <td className="py-2">
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                              style={{
                                backgroundColor: `${severityColor}20`,
                                color: severityColor,
                                border: `1px solid ${severityColor}40`,
                                fontFamily: "Michroma",
                              }}
                            >
                              {attack.severity}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
