import { Route, Routes } from "react-router";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

export default function AppRoutes() {
  const navigationRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Registration /> }
  ]

  return <Routes>
    {navigationRoutes.map((route) =>
      <Route
        key={route.path}
        path={route.path}
        element={route.element}
      />
    )}
  </Routes>
}