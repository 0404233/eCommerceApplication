import { Route, Routes, useLocation } from 'react-router';
import { lazy, ReactElement } from 'react';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/footer/Footer';

const Login = lazy(() => import('../pages/Login/Login'));
const Registration = lazy(() => import('../pages/Registration/Registration'));
const MainPage = lazy(() => import('../pages/Main/Main'));
const CatalogProduct = lazy(
  () => import('../pages/catalog-product/CatalogProduct'),
);
const Basket = lazy(() => import('../pages/Basket/Basket'));
const AboutUs = lazy(() => import('../pages/about-us/AboutUs'));
const UserProfile = lazy(() => import('../pages/user-profile/UserProfile'));
const DetailedProduct = lazy(
  () => import('../pages/detailed-product/DetailedProduct'),
);
const ErrorPage = lazy(() => import('../pages/error-page/ErrorPage'));

type Props = {
  loginStatus: boolean;
  changeLoginStatus: (status: boolean) => void;
};

export default function AppRoutes({
  loginStatus,
  changeLoginStatus,
}: Props): ReactElement {
  const location = useLocation();

  const hideHeaderPaths = ['/login', '/register', '*'];

  const navigationRoutes = [
    { path: '/', element: <MainPage /> },
    { path: '/main', element: <MainPage /> },
    {
      path: '/login',
      element: <Login changeLoginStatus={changeLoginStatus} />,
    },
    {
      path: '/register',
      element: <Registration />,
    },
    { path: '/user', element: <UserProfile /> },
    { path: '/catalog', element: <CatalogProduct /> },
    { path: '/product', element: <DetailedProduct /> },
    { path: '/basket', element: <Basket /> },
    { path: '/about', element: <AboutUs /> },
    { path: '*', element: <ErrorPage /> },
  ];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header
          location={location.pathname}
          loginStatus={loginStatus}
          changeLoginStatus={changeLoginStatus}
        />
      )}
      <Routes>
        {navigationRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </>
  );
}
