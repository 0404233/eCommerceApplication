import classes from './Registration.module.css';

export default function Registration() {
  return (
    <form action="" className={classes["register-form"]}>
      <h1>Sign up</h1>
      <label htmlFor="fullName">Full name</label>
      <input
        id="fullName"
        type="text"
        placeholder="Ivan Ivanov"
        className={classes["register-form__input"]} />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        autoComplete="username"
        type="email"
        placeholder="your@email.com"
        className={classes["register-form__input"]} />
      <label id="password" htmlFor="email">Password</label>
      <input
        id="password"
        autoComplete="current-password"
        type="password" placeholder="********"
        className={classes["register-form__input"]} />
        <button className={classes["register-form__btn"]}>Sign up</button>
        <p>Already have an account? <a href="">Sign in</a></p>
    </form>
  )
}