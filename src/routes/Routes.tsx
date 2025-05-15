import { Route, Routes, useLocation } from 'react-router';
import { lazy } from 'react';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const Login = lazy(() => import('../pages/Login/Login'));
const Registration = lazy(() => import('../pages/Registration/Registration'));
const MainPage = lazy(() => import('../pages/Main/Main'));
const CatalogProduct = lazy(() => import('../pages/CatalogProduct/CatalogProduct'));
const Basket = lazy(() => import('../pages/Basket/Basket'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));
const DetailedProduct = lazy(() => import('../pages/DetailedProduct/DetailedProduct'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));

export default function AppRoutes() {
  const location = useLocation();

  const hideHeaderPaths = ['/login', '/register', '*'];

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
  ];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header location={location.pathname} />}
      <Routes>
        {navigationRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </>
  );
}
