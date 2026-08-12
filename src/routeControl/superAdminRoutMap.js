import { baseRoutes } from "../helpers/baseRoutes";

const SuperAdminAccessRoute = {
  HOME: {
    path: `${baseRoutes.userBaseRoutes}`,
  },
  DASHBOARD: {
    path: `${baseRoutes.superAdminBaseRoute}/dashboard`,
  },
  ADMIN_USERS: {
    path: `${baseRoutes.superAdminBaseRoute}/users`,
  },
  ADMIN_ADD_USERS: {
    path: `${baseRoutes.superAdminBaseRoute}/add-users`,
  },
  ADMIN_PROFILE: {
    path: `${baseRoutes.superAdminBaseRoute}/profile`,
  },
  ADMIN_CHARTS: {
    path: `${baseRoutes.superAdminBaseRoute}/charts`,
  },
  MASTERS: { path: `${baseRoutes.superAdminBaseRoute}/masters` },
  LOGIN: { path: `${baseRoutes.superAdminBaseRoute}/login` },
};

export default SuperAdminAccessRoute;
