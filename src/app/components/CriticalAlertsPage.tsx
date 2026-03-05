import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, Clock, XCircle } from "lucide-react";

const mockAlerts = [
  { 
    id: 1,
    agentName: "web-server-01",
    filePath: "/etc/nginx/nginx.conf",
    description: "Unauthorized configuration modification detected",
    timestamp: "2024-03-04 14:23:45",
    status: "active"
  },
  { 
    id: 2,
    agentName: "db-server-02",
    filePath: "/etc/ssh/sshd_config",
    description: "Critical security file modified - SSH configuration changed",
    timestamp: "2024-03-04 13:28:15",
    status: "active"
  },
  { 
    id: 3,
    agentName: "web-server-01",
    filePath: "/var/www/html/index.php",
    description: "Web application file modified - Possible code injection",
    timestamp: "2024-03-04 14:05:33",
    status: "investigating"
  },
  { 
    id: 4,
    agentName: "app-server-03",
    filePath: "/usr/bin/sudo",
    description: "Critical system binary modified - Privilege escalation risk",
    timestamp: "2024-03-04 12:18:40",
    status: "resolved"
  },
  { 
    id: 5,
    agentName: "dns-server-07",
    filePath: "/etc/hosts",
    description: "DNS configuration altered - Potential DNS poisoning",
    timestamp: "2024-03-04 12:55:18",
    status: "active"
  },
  { 
    id: 6,
    agentName: "mail-server-04",
    filePath: "/etc/postfix/main.cf",
    description: "Mail server configuration changed - Open relay risk",
    timestamp: "2024-03-04 11:42:33",
    status: "investigating"
  },
  { 
    id: 7,
    agentName: "proxy-server-08",
    filePath: "/etc/squid/squid.conf",
    description: "Proxy configuration modified - Security policy bypass detected",
    timestamp: "2024-03-04 11:15:28",
    status: "resolved"
  },
  { 
    id: 8,
    agentName: "file-server-05",
    filePath: "/etc/samba/smb.conf",
    description: "File sharing configuration changed - Unauthorized access possible",
    timestamp: "2024-03-04 10:33:12",
    status: "active"
  },
];

export function CriticalAlertsPage() {
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
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
      case "investigating":
        return { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" };
      case "resolved":
        return { bg: "bg-[#00FF88]/10", text: "text-[#00FF88]", border: "border-[#00FF88]/20" };
      default:
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4" />;
      case "investigating":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
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
                CRITICAL ALERTS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl border border-red-500/30 flex items-center justify-center bg-black/60 backdrop-blur-xl"
              style={{
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.2), inset 0 0 20px rgba(239, 68, 68, 0.05)",
              }}
            >
              <AlertTriangle className="w-7 h-7 text-red-400" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-['Michroma'] tracking-[0.2em] text-2xl text-white">
                CRITICAL ALERTS
              </h1>
              <p className="text-white/40 text-sm tracking-wide mt-0.5">
                File Integrity Monitoring - High Priority Incidents
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
            { label: "Total Alerts", value: "47", icon: AlertTriangle, color: "#FF4444" },
            { label: "Active", value: "28", icon: XCircle, color: "#FF4444" },
            { label: "Investigating", value: "14", icon: Clock, color: "#FFAA00" },
            { label: "Resolved", value: "5", icon: CheckCircle, color: "#00FF88" },
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

        {/* Alerts Table */}
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
              CRITICAL SECURITY ALERTS
            </h2>
            <div className="flex gap-3">
              <select className="px-4 py-2 rounded-lg border border-[#00FF88]/20 bg-black/60 text-[#00FF88] font-['Michroma'] text-xs tracking-wider focus:outline-none focus:border-[#00FF88]/40 transition-colors">
                <option>All Status</option>
                <option>Active</option>
                <option>Investigating</option>
                <option>Resolved</option>
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
                    File Path
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Alert Description
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Timestamp
                  </th>
                  <th className="text-left py-3 px-4 font-['Michroma'] text-xs tracking-wider text-[#00FF88]/80 uppercase">
                    Alert Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAlerts.map((alert, index) => {
                  const statusColors = getStatusColor(alert.status);
                  return (
                    <motion.tr
                      key={alert.id}
                      className="border-b border-[#00FF88]/10 hover:bg-[#00FF88]/5 transition-colors cursor-pointer"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <td className="py-4 px-4 text-white/80 text-sm font-['Michroma'] tracking-wide">
                        {alert.agentName}
                      </td>
                      <td className="py-4 px-4 text-white/70 text-sm font-mono">
                        {alert.filePath}
                      </td>
                      <td className="py-4 px-4 text-white/70 text-sm">
                        {alert.description}
                      </td>
                      <td className="py-4 px-4 text-white/60 text-sm font-['Michroma'] tracking-wide">
                        {alert.timestamp}
                      </td>
                      <td className="py-4 px-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-['Michroma'] tracking-wider ${statusColors.bg} ${statusColors.text} border ${statusColors.border} w-fit`}>
                          {getStatusIcon(alert.status)}
                          <span>{alert.status.toUpperCase()}</span>
                        </div>
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
