import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { AdminMasters } from "../../../pages/SuperAdmin";

export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      key: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Admin Profile",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <h1>Admin Dashboard</h1>,
      // element: <AdminDashboard />,
    },
    {
      path: SuperAdminAccessRoute.MASTERS.path,
      key: SuperAdminAccessRoute.MASTERS.path,
      name: "Masters",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <AdminMasters />,
    }
  ];
}
