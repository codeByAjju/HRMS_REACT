import { SweetAlert } from "../../../components";
import { UserAuthServices } from "../../../Services/User/Auth/index.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorageToken } from "../../../utils/common.util";
import { loginAction } from "../../../redux/AuthSlice/index";
import { useDispatch } from "react-redux";
import routesMap from "../../../routeControl/userRoutMap";
import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { toast } from "react-toastify";
import { AdminCompanyDashboard } from "../../../components";
function SuperAdminCompanyDashboard() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <AdminCompanyDashboard />
    </>
  );
}
export default SuperAdminCompanyDashboard;
