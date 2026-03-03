import { createBrowserRouter } from "react-router";
import { SignInPage } from "./components/SignInPage";
import { SolarSystemDashboard } from "./components/SolarSystemDashboard";
import { PlanetDetailPage } from "./components/PlanetDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
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
