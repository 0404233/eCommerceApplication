import { Route, Routes } from 'react-router';
import { lazy, useEffect, useState } from 'react';
import Header from '../components/layout/Header/Header';

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
      <Header />
      <Routes>
        {navigationRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}
