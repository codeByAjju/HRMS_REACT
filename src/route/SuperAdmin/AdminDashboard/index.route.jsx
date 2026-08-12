import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { DashboardContent } from "../../../components/SuperAdmin/Dashboard";
import { SuperAdminAddUser } from "../../../components/SuperAdmin";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      key: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Admin Dashboard",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <DashboardContent />
    },
    {
      path: SuperAdminAccessRoute.ADMIN_ADD_USERS.path,
      key: SuperAdminAccessRoute.ADMIN_ADD_USERS.path,
      name: "Admin Add Users",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminAddUser />
    },
  ];
}
