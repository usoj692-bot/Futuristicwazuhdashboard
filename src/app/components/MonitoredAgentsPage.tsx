import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, FileSearch, Activity, CheckCircle, XCircle, Clock } from "lucide-react";

const mockAgents = [
  { 
    id: 1, 
    name: "web-server-01", 
    status: "active", 
    lastActivity: "2024-03-04 14:45:32", 
    monitoredFiles: 1247 
  },
  { 
    id: 2, 
    name: "db-server-02", 
    status: "active", 
    lastActivity: "2024-03-04 14:44:18", 
    monitoredFiles: 892 
  },
  { 
    id: 3, 
    name: "app-server-03", 
    status: "active", 
    lastActivity: "2024-03-04 14:43:55", 
    monitoredFiles: 2103 
  },
  { 
    id: 4, 
    name: "mail-server-04", 
    status: "warning", 
    lastActivity: "2024-03-04 14:12:40", 
    monitoredFiles: 634 
  },
  { 
    id: 5, 
    name: "file-server-05", 
    status: "active", 
    lastActivity: "2024-03-04 14:42:11", 
    monitoredFiles: 5421 
  },
  { 
    id: 6, 
    name: "backup-server-06", 
    status: "active", 
    lastActivity: "2024-03-04 14:41:03", 
    monitoredFiles: 3214 
  },
  { 
    id: 7, 
    name: "dns-server-07", 
    status: "inactive", 
    lastActivity: "2024-03-04 13:15:22", 
    monitoredFiles: 156 
  },
  { 
    id: 8, 
    name: "proxy-server-08", 
    status: "active", 
    lastActivity: "2024-03-04 14:44:50", 
    monitoredFiles: 423 
  },
];

export function MonitoredAgentsPage() {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return { bg: "bg-[#00FF88]/10", text: "text-[#00FF88]", border: "border-[#00FF88]/20" };
      case "warning":
        return { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" };
      case "inactive":
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
      default:
        return { bg: "bg-[#00FF88]/10", text: "text-[#00FF88]", border: "border-[#00FF88]/20" };
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-auto">
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
        {/* Header with Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/module/fim")}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl hover:bg-[#00FF88]/5 hover:border-[#00FF88]/40 transition-all duration-300"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)",
              }}
            >
              <ArrowLeft className="w-5 h-5 text-[#00FF88] group-hover:translate-x-[-4px] transition-transform" />
              <span className="font-['Michroma'] tracking-wider text-sm text-[#00FF88]">
                BACK TO FIM
              </span>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <button 
                onClick={() => navigate("/dashboard")}
                className="font-['Michroma'] tracking-wider text-[#00FF88]/60 hover:text-[#00FF88] transition-colors"
              >
                DASHBOARD
              </button>
              <span className="text-[#00FF88]/40">/</span>
              <button 
                onClick={() => navigate("/module/fim")}
                className="font-['Michroma'] tracking-wider text-[#00FF88]/60 hover:text-[#00FF88] transition-colors"
              >
                FIM
              </button>
              <span className="text-[#00FF88]/40">/</span>
              <span className="font-['Michroma'] tracking-wider text-white">
                MONITORED AGENTS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl border border-[#00FF88]/30 flex items-center justify-center bg-black/60 backdrop-blur-xl"
              style={{
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05)",
              }}
            >
              <FileSearch className="w-7 h-7 text-[#00FF88]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-['Michroma'] tracking-[0.2em] text-2xl text-white">
                MONITORED AGENTS
              </h1>
              <p className="text-white/40 text-sm tracking-wide mt-0.5">
                File Integrity Monitoring - Agent Overview
              </p>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="grid grid-cols-4 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Total Agents", value: "156", icon: FileSearch, color: "#00FF88" },
            { label: "Active", value: "142", icon: CheckCircle, color: "#00FF88" },
            { label: "Warning", value: "8", icon: Activity, color: "#FFAA00" },
            { label: "Inactive", value: "6", icon: XCircle, color: "#FF4444" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
              style={{
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-4">
                <stat.icon className="w-5 h-5 text-[#00FF88]/60" strokeWidth={1.5} />
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

        {/* Agents Table */}
        <motion.div
          className="p-6 rounded-2xl border border-[#00FF88]/20 bg-black/40 backdrop-blur-xl"
          style={{
            boxShadow: "0 0 40px rgba(0, 255, 136, 0.08)",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Michroma'] tracking-widest text-white/80 text-sm">
              AGENT LIST
            </h2>
            <div className="flex gap-3">
              <select className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-black/60 text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none focus:border-[#00FF88]/40 transition-colors">
                <option>All Status</option>
                <option>Active</option>
                <option>Warning</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00FF88]/20">
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Agent Name
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Last Activity
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Monitored Files
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAgents.map((agent, index) => {
                  const statusColors = getStatusColor(agent.status);
                  return (
                    <motion.tr
                      key={agent.id}
                      className="border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors cursor-pointer"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <td className="py-4 px-4 text-white/80 text-sm font-['Michroma'] tracking-wide">
                        {agent.name}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}
                        >
                          {agent.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                        {agent.lastActivity}
                      </td>
                      <td className="py-4 px-4 text-white/70 text-sm font-['Michroma'] tracking-wide">
                        {agent.monitoredFiles.toLocaleString()}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
