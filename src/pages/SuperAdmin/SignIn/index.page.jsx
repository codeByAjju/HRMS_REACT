import { LoginForm } from "../../../components";
import { SweetAlert } from "../../../components";
import { UserAuthServices } from "../../../Services/User/Auth/index.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorageToken } from "../../../utils/common.util";
import { loginAction } from "../../../redux/AuthSlice/index";
import { useDispatch } from "react-redux";
import routesMap from "../../../routeControl/userRoutMap";
import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";

function UserLogIn() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function OnSubmit(values) {
    const res = await UserAuthServices.userLogIn(values);
    const authData = res?.data?.data?.User ?? res?.data?.data;
    const role = authData?.role?.toLowerCase();

    if (authData?.token) {
      setLocalStorageToken(authData.token);
      dispatch(loginAction(authData));
      setIsAlertVisible(true);
      navigate(
        role === "user"
          ? routesMap.DASHBOARD.path
          : SuperAdminAccessRoute.DASHBOARD.path
      );
    } else window.alert("Unauthorized User");
  }
  return (
    <>
      <LoginForm onSubmit={OnSubmit} />
      <SweetAlert
        title="Congratulations"
        text="Login Successfull"
        show={isAlertVisible}
        icon="success"
        setIsAlertVisible={setIsAlertVisible}
        timer="1500"
      />
    </>
  );
}
export default UserLogIn;
