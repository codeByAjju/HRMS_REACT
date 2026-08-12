import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { DashboardContent } from "../../../components/SuperAdmin/Dashboard";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      key: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Admin Profile",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <DashboardContent />
    },
  ];
}
