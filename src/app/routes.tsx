import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { SignInPage } from "./components/SignInPage";
import { SolarSystemDashboard } from "./components/SolarSystemDashboard";
import { PlanetDetailPage } from "./components/PlanetDetailPage";

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
    path: "/planet/:planetId",
    Component: PlanetDetailPage,
  },
]);