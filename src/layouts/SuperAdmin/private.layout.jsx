import { Outlet, useNavigate } from "react-router-dom";
import AppLayout from "../App/index.layout";
import { useEffect, useState } from "react";

function SuperAdminPrivateLayout() {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  return (
    <>
      <AppLayout setRedirectPath={setRedirectPath} >
        <main className="nk-body bg-lighter npc-default has-sidebar">
          <div className="nk-app-root">
            <div className="nk-main">
              <Outlet />
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
}

export default SuperAdminPrivateLayout;
