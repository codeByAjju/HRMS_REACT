import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../App/index.layout";
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

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <Outlet />
    </AppLayout>
  );
}

export default PrivateLayout;
