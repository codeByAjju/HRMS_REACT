import routesMap from "../../../routeControl/userRoutMap";

export default function route() {
  return [
    {
      path: routesMap.DASHBOARD.path,
      name: "DASHBOARD",
      key: routesMap.DASHBOARD.path,
      commonRoute: true,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <h1>Protected Route</h1>,
    },
  ];
}
