import classes from './ErrorPage.module.css';
import { useNavigate } from 'react-router';

export default function ErrorPage() {
  const url = window.location.pathname.slice(1);

  const navigate = useNavigate();

  return (
    <div className={classes['error-page__wrapper']}>
      <h1 className={classes['error-page__title']}>
        Page <span className={classes['incorrect-url']}>"{url}"</span> is not
        found
      </h1>
      <button className={classes['error__btn']} onClick={() => navigate('/')}>
        Go to Main page
      </button>
    </div>
  );
}
