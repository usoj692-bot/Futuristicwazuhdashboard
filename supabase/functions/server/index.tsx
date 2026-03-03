import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8386ed58/health", (c) => {
  return c.json({ status: "ok" });
});

// Wazuh API proxy endpoints
// Get agents data
app.get("/make-server-8386ed58/wazuh/agents", async (c) => {
  try {
    const wazuhUrl = Deno.env.get("WAZUH_API_URL");
    const wazuhUsername = Deno.env.get("WAZUH_API_USERNAME");
    const wazuhPassword = Deno.env.get("WAZUH_API_PASSWORD");

    if (!wazuhUrl || !wazuhUsername || !wazuhPassword) {
      console.log("Wazuh credentials not configured, returning mock data");
      // Return mock data if Wazuh is not configured
      return c.json({
        data: {
          affected_items: [
            { id: "001", name: "agent-1", status: "active", ip: "192.168.1.10" },
            { id: "002", name: "agent-2", status: "active", ip: "192.168.1.11" },
            { id: "003", name: "agent-3", status: "disconnected", ip: "192.168.1.12" },
          ],
          total_affected_items: 3,
        },
      });
    }

    // Authenticate with Wazuh
    const authResponse = await fetch(`${wazuhUrl}/security/user/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${wazuhUsername}:${wazuhPassword}`)}`,
      },
    });

    if (!authResponse.ok) {
      throw new Error(`Wazuh authentication failed: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json();
    const token = authData.data.token;

    // Fetch agents
    const agentsResponse = await fetch(`${wazuhUrl}/agents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!agentsResponse.ok) {
      throw new Error(`Failed to fetch agents: ${agentsResponse.statusText}`);
    }

    const agentsData = await agentsResponse.json();
    return c.json(agentsData);
  } catch (error) {
    console.error("Error fetching Wazuh agents:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get security alerts
app.get("/make-server-8386ed58/wazuh/alerts", async (c) => {
  try {
    const wazuhUrl = Deno.env.get("WAZUH_API_URL");
    const wazuhUsername = Deno.env.get("WAZUH_API_USERNAME");
    const wazuhPassword = Deno.env.get("WAZUH_API_PASSWORD");

    if (!wazuhUrl || !wazuhUsername || !wazuhPassword) {
      console.log("Wazuh credentials not configured, returning mock data");
      // Return mock data
      return c.json({
        data: {
          critical: 12,
          high: 45,
          medium: 89,
          low: 234,
          recent_alerts: [
            { id: 1, level: "critical", description: "Brute force attack detected", timestamp: new Date().toISOString() },
            { id: 2, level: "high", description: "Unauthorized access attempt", timestamp: new Date().toISOString() },
            { id: 3, level: "medium", description: "Suspicious file modification", timestamp: new Date().toISOString() },
          ],
        },
      });
    }

    // Authenticate with Wazuh
    const authResponse = await fetch(`${wazuhUrl}/security/user/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${wazuhUsername}:${wazuhPassword}`)}`,
      },
    });

    if (!authResponse.ok) {
      throw new Error(`Wazuh authentication failed: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json();
    const token = authData.data.token;

    // Fetch alerts
    const alertsResponse = await fetch(`${wazuhUrl}/security/alerts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!alertsResponse.ok) {
      throw new Error(`Failed to fetch alerts: ${alertsResponse.statusText}`);
    }

    const alertsData = await alertsResponse.json();
    return c.json(alertsData);
  } catch (error) {
    console.error("Error fetching Wazuh alerts:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get system stats
app.get("/make-server-8386ed58/wazuh/stats", async (c) => {
  try {
    const wazuhUrl = Deno.env.get("WAZUH_API_URL");
    const wazuhUsername = Deno.env.get("WAZUH_API_USERNAME");
    const wazuhPassword = Deno.env.get("WAZUH_API_PASSWORD");

    if (!wazuhUrl || !wazuhUsername || !wazuhPassword) {
      console.log("Wazuh credentials not configured, returning mock data");
      // Return mock data
      return c.json({
        data: {
          events: 45234,
          compliance: 87,
          uptime: "99.9%",
        },
      });
    }

    // Authenticate and fetch stats from Wazuh
    const authResponse = await fetch(`${wazuhUrl}/security/user/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${wazuhUsername}:${wazuhPassword}`)}`,
      },
    });

    if (!authResponse.ok) {
      throw new Error(`Wazuh authentication failed: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json();
    const token = authData.data.token;

    // Fetch system stats
    const statsResponse = await fetch(`${wazuhUrl}/manager/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!statsResponse.ok) {
      throw new Error(`Failed to fetch stats: ${statsResponse.statusText}`);
    }

    const statsData = await statsResponse.json();
    return c.json(statsData);
  } catch (error) {
    console.error("Error fetching Wazuh stats:", error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);