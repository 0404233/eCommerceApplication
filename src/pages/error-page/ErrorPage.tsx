import { ReactElement } from 'react';
import classes from './error-page.module.css';
import { useNavigate } from 'react-router';

export default function ErrorPage(): ReactElement {
  const basename = '/eCommerceApplication';
  const pagePath = window.location.pathname.replace(basename, '').slice(1);
  const navigate = useNavigate();

  return (
    <div className={classes['error-page__wrapper']}>
      <h1 className={classes['error-page__title']}>
        Page <span className={classes['incorrect-url']}>{pagePath}</span> is not
        found:&#40;
      </h1>
      <button className={classes['error__btn']} onClick={() => navigate('/')}>
        Go to Main page
      </button>
    </div>
  );
}
