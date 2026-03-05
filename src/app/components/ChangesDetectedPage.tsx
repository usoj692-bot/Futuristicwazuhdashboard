import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Activity, FileSearch, FilePlus, FileEdit, Trash2 } from "lucide-react";

const mockChanges = [
  { 
    id: 1,
    filePath: "/etc/nginx/nginx.conf",
    agentName: "web-server-01",
    changeType: "Modified",
    timestamp: "2024-03-04 14:23:45",
    severity: "high"
  },
  { 
    id: 2,
    filePath: "/usr/bin/docker",
    agentName: "app-server-03",
    changeType: "Modified",
    timestamp: "2024-03-04 14:18:12",
    severity: "medium"
  },
  { 
    id: 3,
    filePath: "/var/www/html/index.php",
    agentName: "web-server-01",
    changeType: "Modified",
    timestamp: "2024-03-04 14:05:33",
    severity: "high"
  },
  { 
    id: 4,
    filePath: "/opt/app/config.yaml",
    agentName: "app-server-03",
    changeType: "Created",
    timestamp: "2024-03-04 13:52:08",
    severity: "low"
  },
  { 
    id: 5,
    filePath: "/tmp/cache/session_data",
    agentName: "web-server-01",
    changeType: "Deleted",
    timestamp: "2024-03-04 13:34:22",
    severity: "low"
  },
  { 
    id: 6,
    filePath: "/etc/ssh/sshd_config",
    agentName: "db-server-02",
    changeType: "Modified",
    timestamp: "2024-03-04 13:28:15",
    severity: "critical"
  },
  { 
    id: 7,
    filePath: "/home/admin/.bash_history",
    agentName: "mail-server-04",
    changeType: "Modified",
    timestamp: "2024-03-04 13:15:40",
    severity: "medium"
  },
  { 
    id: 8,
    filePath: "/var/log/auth.log",
    agentName: "proxy-server-08",
    changeType: "Modified",
    timestamp: "2024-03-04 13:02:33",
    severity: "medium"
  },
  { 
    id: 9,
    filePath: "/etc/hosts",
    agentName: "dns-server-07",
    changeType: "Modified",
    timestamp: "2024-03-04 12:55:18",
    severity: "high"
  },
  { 
    id: 10,
    filePath: "/usr/local/bin/backup.sh",
    agentName: "backup-server-06",
    changeType: "Created",
    timestamp: "2024-03-04 12:42:05",
    severity: "low"
  },
];

export function ChangesDetectedPage() {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
      case "high":
        return { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" };
      case "medium":
        return { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" };
      default:
        return { bg: "bg-[#00FF88]/10", text: "text-[#00FF88]", border: "border-[#00FF88]/20" };
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case "Created":
        return <FilePlus className="w-4 h-4" />;
      case "Modified":
        return <FileEdit className="w-4 h-4" />;
      case "Deleted":
        return <Trash2 className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case "Created":
        return "text-[#00FF88]";
      case "Modified":
        return "text-[#FFAA00]";
      case "Deleted":
        return "text-[#FF4444]";
      default:
        return "text-white/60";
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
                CHANGES DETECTED
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
              <Activity className="w-7 h-7 text-[#00FF88]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-['Michroma'] tracking-[0.2em] text-2xl text-white">
                CHANGES DETECTED
              </h1>
              <p className="text-white/40 text-sm tracking-wide mt-0.5">
                File Integrity Monitoring - Change Events
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
            { label: "Total Changes", value: "268", icon: Activity, color: "#00FF88" },
            { label: "Files Created", value: "145", icon: FilePlus, color: "#00FF88" },
            { label: "Files Modified", value: "89", icon: FileEdit, color: "#FFAA00" },
            { label: "Files Deleted", value: "34", icon: Trash2, color: "#FF4444" },
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

        {/* Changes Table */}
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
              FILE INTEGRITY CHANGE EVENTS
            </h2>
            <div className="flex gap-3">
              <select className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-black/60 text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none focus:border-[#00FF88]/40 transition-colors">
                <option>All Changes</option>
                <option>Created</option>
                <option>Modified</option>
                <option>Deleted</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-black/60 text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none focus:border-[#00FF88]/40 transition-colors">
                <option>All Severity</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00FF88]/20">
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    File Path
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Agent Name
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Change Type
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Timestamp
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockChanges.map((change, index) => {
                  const severityColors = getSeverityColor(change.severity);
                  return (
                    <motion.tr
                      key={change.id}
                      className="border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors cursor-pointer"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <td className="py-4 px-4 text-white/80 text-sm font-mono">
                        {change.filePath}
                      </td>
                      <td className="py-4 px-4 text-white/70 text-sm font-['Michroma'] tracking-wide">
                        {change.agentName}
                      </td>
                      <td className="py-4 px-4">
                        <div className={`flex items-center gap-2 ${getChangeTypeColor(change.changeType)}`}>
                          {getChangeTypeIcon(change.changeType)}
                          <span className="text-sm font-['Michroma'] tracking-wider">
                            {change.changeType.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                        {change.timestamp}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${severityColors.bg} ${severityColors.text} border ${severityColors.border}`}
                        >
                          {change.severity.toUpperCase()}
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
    </div>
  );
}
