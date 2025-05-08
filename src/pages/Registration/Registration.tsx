import { useNavigate } from 'react-router';
import classes from './Registration.module.css';

export default function Registration() {

  const navigate = useNavigate();

  return (
    <form action="" className={classes["form-register"]}>
      <h1>Sign up</h1>

      <label htmlFor="fullName">Full name</label>
      <input
        id="fullName"
        type="text"
        placeholder="Ivan Ivanov"
        className={classes["form-register__input"]} />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        autoComplete="username"
        type="email"
        placeholder="your@email.com"
        className={classes["form-register__input"]} />

      <label id="password" htmlFor="email">Password</label>
      <input
        id="password"
        autoComplete="current-password"
        type="password"
        placeholder="********"
        className={classes["form-register__input"]} />

      <button className={classes["form-register__btn"]} type="submit">Sign up</button>
      <p>Already have an account? <a onClick={() => navigate('/login')}>Sign in</a></p>
    </form>
  )
}