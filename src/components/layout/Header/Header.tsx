import { ReactElement } from 'react';
import HomeIcon from '../../../assets/svg/home.svg?react';
import styles from './header.module.css';
import { useNavigate } from 'react-router';
import {
  deleteTokenCookie,
  getTokenFromCookie,
} from '../../../services/http/get-token-from-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type HeaderProps = {
  location: string;
  loginStatus: boolean;
  changeLoginStatus: (status: boolean) => void;
};

export default function Header({
  location,
  loginStatus,
  changeLoginStatus,
}: HeaderProps): ReactElement {
  const navigate = useNavigate();

  const navigationRoutes = [
    { path: '/catalog' },
    { path: '/product' },
    { path: '/basket' },
    { path: '/about' },
  ];

  const handleLogout = () => {
    const token = getTokenFromCookie();
    if (token) {
      deleteTokenCookie();
      changeLoginStatus(false);
      navigate('/main');
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
            location === '/main' || location === '/' ? '#737aff' : '#FFFFFF'
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
        {!loginStatus && (
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
        {loginStatus && (
          <>
            <AccountCircleIcon
              onClick={() => navigate('/user')}
              sx={{ fontSize: 31 }}
              className={`${styles['user-icon']} ${location === '/user' ? styles['selected'] : ''}`}
            ></AccountCircleIcon>
            <button
              className={styles['button-header-route']}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
