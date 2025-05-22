import { ReactElement } from 'react';
import classes from '../../../pages/Registration/Registration.module.css';

export default function ButtonSignUp(): ReactElement {
  return (
    <button type="submit" className={classes['form-register__btn']}>
      Sign up
    </button>
  );
}
