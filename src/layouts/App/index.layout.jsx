import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  generatePath,
  matchPath,
  useLocation,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

import { baseRoutes } from "../../helpers/baseRoutes";
import { getUserAuthData } from "../../redux/AuthSlice";
import { getCompletePathList } from "../../route";

import authDriver from "../../utils/auth.util";
import logger from "../../utils/logger";

import userAccessRoute from "../../routeControl/userRoutMap";
import SuperAdminAccessRoute from "../../routeControl/superAdminRoutMap";

const roleRedirectMap = {
  admin: SuperAdminAccessRoute.DASHBOARD.path,
  user: userAccessRoute.DASHBOARD.path,
};

function AppLayout({ setRedirectPath, children }) {
  const location = useLocation();
  const params = useParams();

  const userData = useSelector(getUserAuthData);

  /**
   * ---------------------------------------------------------
   * Normalize user role
   * ---------------------------------------------------------
   *
   * Your actual userData:
   *
   * {
   *   role: "admin"
   * }
   *
   * So DON'T use:
   *
   * userData.UserRoles[0].Role.name
   */
  const role = userData?.role?.toLowerCase() || null;

  /**
   * ---------------------------------------------------------
   * Generate dynamic route path
   * ---------------------------------------------------------
   */
  const getGeneratedPath = (routePath) => {
    try {
      return generatePath(routePath, params);
    } catch (error) {
      logger(error);
      return routePath;
    }
  };

  /**
   * ---------------------------------------------------------
   * Find active route
   * ---------------------------------------------------------
   *
   * matchPath is better than:
   *
   * routePath === location.pathname
   *
   * because it supports dynamic routes.
   *
   * Example:
   *
   * /user/profile/:id
   * /user/profile/123
   */
  const activeRoute = getCompletePathList().find((route) => {
    if (!route?.key) {
      return false;
    }

    try {
      const generatedPath = getGeneratedPath(route.key);

      if (generatedPath === location.pathname) {
        return true;
      }

      return Boolean(
        matchPath(
          {
            path: route.key,
            end: true,
          },
          location.pathname
        )
      );
    } catch (error) {
      logger(error);
      return false;
    }
  });

  /**
   * ---------------------------------------------------------
   * Route information
   * ---------------------------------------------------------
   */
  const isPrivate = activeRoute?.private;

  /**
   * ---------------------------------------------------------
   * Check authentication / authorization
   * ---------------------------------------------------------
   */
  const isValid = authDriver(
    activeRoute,
    userData,
    location.pathname
  );

  const isAdminRoute =
    activeRoute?.adminAccess === true ||
    location.pathname
      .replace(/^\/+/, "")
      .startsWith(baseRoutes.superAdminBaseRoute.replace(/^\/+/, ""));

  /**
   * ---------------------------------------------------------
   * Check route validity
   * ---------------------------------------------------------
   */
  const checkValid = useCallback(() => {
    /**
     * Unknown route
     *
     * Don't render children.
     */
    if (!activeRoute) {
      return;
    }

    /**
     * -------------------------------------------------------
     * CURRENT ROUTE IS VALID
     * -------------------------------------------------------
     */
    if (isValid) {
      return;
    }

    /**
     * -------------------------------------------------------
     * CURRENT ROUTE IS INVALID
     * -------------------------------------------------------
     */

    /**
     * Logged-in user/admin trying to access
     * unauthorized route.
     */
    if (userData?.token && role && roleRedirectMap[role]) {
      /**
       * Admin trying to access user route
       */
      if (
        role === "admin" &&
        activeRoute?.commonRoute === true &&
        activeRoute?.adminAccess !== true
      ) {
        toast.warning("You are not authorized to access this page.");
        setRedirectPath(
          roleRedirectMap.admin
        );

        return;
      }

      /**
       * User trying to access admin route
       */
      if (
        role === "user" &&
        activeRoute?.adminAccess === true
      ) {
        toast.warning("You are not authorized to access this page.");

        setRedirectPath(
          roleRedirectMap.user
        );

        return;
      }

      /**
       * Logged-in user trying to access login/public page.
       */
      if (activeRoute?.private === false) {
        setRedirectPath(
          roleRedirectMap[role]
        );

        return;
      }

      /**
       * Any other unauthorized private route.
       */
      setRedirectPath(
        roleRedirectMap[role]
      );

      return;
    }

    /**
     * -------------------------------------------------------
     * USER IS NOT LOGGED IN
     * -------------------------------------------------------
     */

    if (isPrivate === true) {
      toast.warning("Please login to continue.");

      setRedirectPath(
        isAdminRoute
          ? SuperAdminAccessRoute.LOGIN.path
          : userAccessRoute.LOGIN.path
      );
    }
  }, [
    activeRoute,
    isAdminRoute,
    isPrivate,
    isValid,
    role,
    setRedirectPath,
    userData?.token,
  ]);

  /**
   * ---------------------------------------------------------
   * Run authorization whenever pathname changes
   * ---------------------------------------------------------
   */
  useEffect(() => {
    checkValid();
  }, [checkValid]);

  /**
   * ---------------------------------------------------------
   * Render only authorized routes
   * ---------------------------------------------------------
   */
  return <>{isValid ? children : null}</>;
}

AppLayout.propTypes = {
  setRedirectPath: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default AppLayout;
