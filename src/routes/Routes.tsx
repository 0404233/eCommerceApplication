import { Route, Routes, useLocation, useMatch } from 'react-router';
import { lazy, ReactElement } from 'react';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const Login = lazy(() => import('../pages/Login/Login'));
const Registration = lazy(() => import('../pages/Registration/Registration'));
const MainPage = lazy(() => import('../pages/Main/Main'));
const CatalogProduct = lazy(() => import('../pages/catalog-product/CatalogProduct'));
const Basket = lazy(() => import('../pages/Basket/Basket'));
const AboutUs = lazy(() => import('../pages/about-us/AboutUs'));
const UserProfile = lazy(() => import('../pages/user-profile/UserProfile'));
const DetailedProduct = lazy(() => import('../pages/detailed-product/DetailedProduct'));
const ErrorPage = lazy(() => import('../pages/error-page/ErrorPage'));

type Props = {
  loginStatus: boolean;
  changeLoginStatus: (status: boolean) => void;
};

export default function AppRoutes({ loginStatus, changeLoginStatus }: Props): ReactElement {
  const location = useLocation();
  const basename = '/eCommerceApplication';

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

  const pagePath = window.location.pathname.replace(basename, '');
  const isLogin = useMatch('/login');
  const isRegister = useMatch('/register');
  const correctPath = navigationRoutes.slice(0, -1).some(({ path }) => path.includes(pagePath));
  const hideHeaderPaths = isLogin || isRegister || !correctPath;

  return (
    <>
      {!hideHeaderPaths && (
        <Header location={location.pathname} loginStatus={loginStatus} changeLoginStatus={changeLoginStatus} />
      )}
      <Routes>
        {navigationRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {!hideHeaderPaths && <Footer />}
    </>
  );
}
