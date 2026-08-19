import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { AdminCharts, AdminProfile, DashboardContent } from "../../../components/SuperAdmin";
import { SuperAdminAddUser } from "../../../components/SuperAdmin";
import { SuperAdminCompanyDashboard } from "../../../pages";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.ADMIN_COMPANY.path,
      key: SuperAdminAccessRoute.ADMIN_COMPANY.path,
      name: "Admin Company",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminCompanyDashboard />
    },
  ];
}
