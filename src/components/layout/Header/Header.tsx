import { ReactElement, useEffect } from 'react';
import HomeIcon from '../../../assets/home.svg?react';
import styles from './Header.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { userData } from '../../../userData';

type Props = {
  location: string;
};

export default function Header({ location }: Props): ReactElement {
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

  function onLogout() {
    userData.setUserLogin(false);
    setIsUserAuthorized(userData.getUserData());
  }

  return (
    <header className={styles['header-layout']}>
      <button className={styles['header__to-main']} onClick={() => navigate('/main')}>
        <HomeIcon
          width={30}
          height={30}
          fill={location === '/main' || location === '/' ? '#00c700' : '#FFFFFF'}
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
              {path.slice(1)}
            </li>
          ))}
        </ul>
      </nav>
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
