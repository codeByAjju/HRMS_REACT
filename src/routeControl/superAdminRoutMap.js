import { baseRoutes } from "../helpers/baseRoutes";

const SuperAdminAccessRoute = {
  HOME: {
    path: `${baseRoutes.userBaseRoutes}`,
  },
  DASHBOARD: {
    path: `${baseRoutes.superAdminBaseRoute}/dashboard`,
  },
  MASTERS: { path: `${baseRoutes.superAdminBaseRoute}/masters` },
  LOGIN: { path: `${baseRoutes.superAdminBaseRoute}/login` },
};

export default SuperAdminAccessRoute;
