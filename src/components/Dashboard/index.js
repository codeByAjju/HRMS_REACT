import loadable from "@loadable/component";
export const Sidebar = loadable(() => import("./Sidebar/index"));
export const UserDashboard = loadable(() => import("./Home/index"));
export const UserProfile = loadable(() => import("./Profile/index"));
