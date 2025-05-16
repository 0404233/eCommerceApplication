import { ReactElement, useEffect } from 'react';
import HomeIcon from '../../../assets/home.svg?react';
import styles from './Header.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { userData } from '../../../userData';
import { getTokenFromCookie } from '../../../services/http/getTokenFromCookie';
import { logoutCustomer } from '../../../services/http/logoutCustomer';

type HeaderProps = {
  location: string;
};

export default function Header({ location }: HeaderProps): ReactElement {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);

  useEffect(() => {
    setIsUserAuthorized(userData.getUserData());
  }, []);

  const navigate = useNavigate();

  const navigationRoutes = [
    { path: '/user' },
    { path: '/catalog' },
    { path: '/product' },
    { path: '/basket' },
    { path: '/about' },
  ];

  const handleLogout = () => {
    const token = getTokenFromCookie();

    if (token) {
      logoutCustomer(token, 'access_token');
      userData.setUserLogin(false);
      userData.clearCookie();
      setIsUserAuthorized(false);
      navigate('/main')
    }
  };

  return (
    <header className={styles['header-layout']}>
      <button
        className={styles['header__to-main']}
        onClick={() => navigate('/main')}
      >
        <HomeIcon
          width={30}
          height={30}
          fill={
            location === '/main' || location === '/' ? '#00c700' : '#FFFFFF'
          }
        />
      </button>
      <nav className={styles['links-to-pages']}>
        <ul className={styles['links-list']}>
          {navigationRoutes.map(({ path }) => (
            <li
              key={path}
              className={`${styles['page-link']} ${path === location ? styles['selected-page'] : ''}`}
              onClick={() => navigate(path)}
            >
              {path.slice(1, 2).toLocaleUpperCase() + path.substring(2)}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles['button-group']}>
        {!isUserAuthorized && (
          <>
            <button
              className={styles['button-header-route']}
              onClick={() => navigate('/register')}
            >
              Registration
            </button>
            <button
              className={styles['button-header-route']}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </>
        )}
        {isUserAuthorized && (
          <button className={styles['button-header-route']} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
