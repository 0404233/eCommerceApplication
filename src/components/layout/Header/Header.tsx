import { ReactElement, useEffect } from 'react';
import styles from './Header.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { userData } from '../../../userData';

export default function Header(): ReactElement {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  useEffect(() => {
    setIsUserAuthorized(userData.getUserData());
  }, []);
  const navigate = useNavigate();

  const navigationRoutes = [
    { path: '/main' },
    { path: '/user' },
    { path: '/catalog' },
    { path: '/product' },
    { path: '/basket' },
    { path: '/about' },
  ];

  function onLogout() {
    userData.setUserLogin(false);
    setIsUserAuthorized(userData.getUserData());
  }

  return (
    <header className={styles['header-layout']}>
      <button className={styles['header__to-main']} onClick={() => navigate('/')}>
        Main
      </button>
      <div className={styles['links-to-pages']}>
        {navigationRoutes.map(({ path }) => (
          <button key={path} className={styles['page-link-btn']} onClick={() => navigate(path)}>
            {path.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles['button-group']}>
        {!isUserAuthorized && (
          <>
            <button className={styles['button-header-route']} onClick={() => navigate('/register')}>
              Registration
            </button>
            <button className={styles['button-header-route']} onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
        {isUserAuthorized && (
          <button className={styles['button-header-route']} onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
