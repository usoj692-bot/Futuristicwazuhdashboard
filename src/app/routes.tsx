import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { SignInPage } from "./components/SignInPage";
import { SolarSystemDashboard } from "./components/SolarSystemDashboard";
import { PlanetDetailPage } from "./components/PlanetDetailPage";
import { ModuleDashboard } from "./components/ModuleDashboard";
import { MonitoredAgentsPage } from "./components/MonitoredAgentsPage";
import { ChangesDetectedPage } from "./components/ChangesDetectedPage";
import { CriticalAlertsPage } from "./components/CriticalAlertsPage";
import { OverviewDashboard } from "./components/OverviewDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/signin",
    Component: SignInPage,
  },
  {
    path: "/dashboard",
    Component: SolarSystemDashboard,
  },
  {
    path: "/overview",
    Component: OverviewDashboard,
  },
  {
    path: "/planet/:planetId",
    Component: PlanetDetailPage,
  },
  {
    path: "/module/:moduleId",
    Component: ModuleDashboard,
  },
  {
    path: "/fim/monitored-agents",
    Component: MonitoredAgentsPage,
  },
  {
    path: "/fim/changes-detected",
    Component: ChangesDetectedPage,
  },
  {
    path: "/fim/critical-alerts",
    Component: CriticalAlertsPage,
  },
]);