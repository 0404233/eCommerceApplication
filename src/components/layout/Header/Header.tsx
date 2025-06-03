import { ReactElement, useEffect, useState } from 'react';
import HomeIcon from '../../../assets/svg/home.svg?react';
import styles from './header.module.css';
import { useNavigate } from 'react-router';
import { deleteTokenCookie, getTokenFromCookie } from '../../../services/http/get-token-from-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type HeaderProps = {
  location: string;
  loginStatus: boolean;
  changeLoginStatus: (status: boolean) => void;
};

export default function Header({ location, loginStatus, changeLoginStatus }: HeaderProps): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navigate = useNavigate();

  const navigationRoutes = [{ path: '/catalog' }, { path: '/basket' }, { path: '/about' }];

  const handleLogout = () => {
    const token = getTokenFromCookie();
    if (token) {
      navigate('/main');
      deleteTokenCookie();
      changeLoginStatus(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles['header-layout']}>
      <button className={styles['header__to-main']} onClick={() => navigate('/main')}>
        <HomeIcon width={30} height={30} fill={location === '/main' || location === '/' ? '#737aff' : '#FFFFFF'} />
      </button>

      <button className={`${styles['burger']} ${menuOpen ? styles['open'] : ''}`} onClick={toggleMenu}>
        <span className={styles['burger-line']} />
        <span className={styles['burger-line']} />
        <span className={styles['burger-line']} />
      </button>

      <nav className={`${styles['links-to-pages']} ${menuOpen ? styles['open'] : ''}`}>
        <ul className={styles['links-list']}>
          {navigationRoutes.map(({ path }) => (
            <li
              key={path}
              className={`${styles['page-link']} ${path === location ? styles['selected-page'] : ''}`}
              onClick={() => {
                navigate(path);
                setMenuOpen(false);
              }}
            >
              {path.slice(1, 2).toLocaleUpperCase() + path.substring(2)}
            </li>
          ))}
        </ul>
        <div className={styles['button-group']}>
          {!loginStatus && (
            <>
              <button className={styles['button-header-route']} onClick={() => navigate('/register')}>
                Registration
              </button>
              <button className={styles['button-header-route']} onClick={() => navigate('/login')}>
                Login
              </button>
            </>
          )}
          {loginStatus && (
            <>
              <AccountCircleIcon
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/user');
                }}
                sx={{ fontSize: 31 }}
                className={`${styles['user-icon']} ${location === '/user' ? styles['selected'] : ''}`}
              ></AccountCircleIcon>
              <button className={styles['button-header-route']} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
