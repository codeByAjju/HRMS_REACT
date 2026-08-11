import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { AdminMasters } from "../../../pages/SuperAdmin";
import { Navbar } from "../../../components";
import AdminDashboardLayout from "../../../layouts/Admin/index.layout";

export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      key: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Admin Profile",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <AdminDashboardLayout />,
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
