import { ReactElement } from 'react';
import classes from '../../../pages/Login/login.module.css';

export default function ButtonSignIn(): ReactElement {
  return (
    <button type="submit" className={classes['form-login__btn']}>
      Sign in
    </button>
  );
}
