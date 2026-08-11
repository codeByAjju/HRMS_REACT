import loadable from "@loadable/component";
export const Sidebar = loadable(() => import("./Sidebar/index"));
export const UserDashboard = loadable(() => import("./Home/index"));
export const UserProfile = loadable(() => import("../../User/Profile/index"));
export const AdminSidebar = loadable(() => import("./AdminSidebar/index"));
export const Navbar = loadable(() => import("./Navbar/index"));
export const DashboardContent = loadable(() => import("./DashboardContent/index"));
