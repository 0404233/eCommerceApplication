import { Route, Routes } from "react-router";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import MainPage from "../pages/Main/Main";
import CatalogProduct from "../pages/CatalogProduct/CatalogProduct";
import Basket from "../pages/Basket/Basket";
import AboutUs from "../pages/AboutUs/AboutUs";
import UserProfile from "../pages/UserProfile/UserProfile";
import DetailedProduct from "../pages/DetailedProduct/DetailedProduct";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export default function AppRoutes() {
  const navigationRoutes = [
    { path: '/', element: <MainPage /> },
    { path: '/main', element: <MainPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Registration /> },
    { path: '/user', element: <UserProfile /> },
    { path: '/catalog', element: <CatalogProduct /> },
    { path: '/product', element: <DetailedProduct /> },
    { path: '/basket', element: <Basket /> },
    { path: '/about', element: <AboutUs /> },
    { path: '*', element: <ErrorPage /> },
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