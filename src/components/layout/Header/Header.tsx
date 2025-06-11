import { ReactElement, useEffect, useState } from 'react';
import HomeIcon from '../../../assets/svg/home.svg?react';
import styles from './header.module.css';
import { useNavigate } from 'react-router';
import { deleteTokenCookie, getTokenFromCookie } from '../../../services/http/get-token-from-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTES } from '../../../routes/constants-routes';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

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

  const navigationRoutes = [ROUTES.CATALOG, ROUTES.ABOUT];

  const handleLogout = () => {
    const token = getTokenFromCookie();
    if (token) {
      navigate(ROUTES.MAIN);
      deleteTokenCookie();
      changeLoginStatus(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles['header-layout']}>
      <button
        className={styles['header__to-main']}
        onClick={() => {
          navigate(ROUTES.MAIN);
          setMenuOpen(false);
        }}
      >
        <HomeIcon width={70} height={70} fill={location === ROUTES.MAIN || location === '/' ? '#737aff' : '#FFFFFF'} />
      </button>

      <button className={`${styles['burger']} ${menuOpen ? styles['open'] : ''}`} onClick={toggleMenu}>
        <span className={styles['burger-line']} />
        <span className={styles['burger-line']} />
        <span className={styles['burger-line']} />
      </button>

      <nav className={`${styles['links-to-pages']} ${menuOpen ? styles['open'] : ''}`}>
        <ul className={styles['links-list']}>
          {navigationRoutes.map((path) => (
            <li
              key={path}
              className={`${styles['page-link']} ${path === location ? styles['selected-page'] : ''}`}
              onClick={() => {
                navigate(path);
                setMenuOpen(false);
              }}
            >
              {path !== ROUTES.ABOUT && path.slice(1, 2).toUpperCase() + path.substring(2)}
              {path === ROUTES.ABOUT && path.slice(1, 2).toUpperCase() + path.substring(2) + ' Us'}
            </li>
          ))}
        </ul>
        <div className={styles['button-group']}>
          <div className={`${styles['cart-icon-link']}`}>
            <ShoppingCartTwoToneIcon
              fontSize="large"
              className={`${location === ROUTES.BASKET ? styles['selected-page'] : ''}`}
              onClick={() => {
                navigate(ROUTES.BASKET);
                setMenuOpen(false);
              }}
            />
          </div>
          {!loginStatus && (
            <>
              <button className={styles['button-header-route']} onClick={() => navigate(ROUTES.REGISTER)}>
                Registration
              </button>
              <button className={styles['button-header-route']} onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </button>
            </>
          )}
          {loginStatus && (
            <>
              <div className={`${styles['user-icon']}`}>
                <AccountCircleIcon
                  fontSize="large"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(ROUTES.USER);
                  }}
                  className={`${location === ROUTES.USER ? styles['selected'] : ''}`}
                />
              </div>
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
