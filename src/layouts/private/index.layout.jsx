import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../App/index.layout";
import AdminDashboardLayout from "../Admin/index.layout";
import { useEffect, useState } from "react";

function PrivateLayout() {
  const [redirectPath, setRedirectPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  // Check if current route is dashboard
  const isDashboard = location.pathname.includes("/dashboard");

  // Use AdminDashboardLayout for dashboard routes, AppLayout for others
  if (isDashboard) {
    return (
      <AdminDashboardLayout>
        <Outlet />
      </AdminDashboardLayout>
    );
  }

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <Outlet />
    </AppLayout>
  );
}

export default PrivateLayout;
