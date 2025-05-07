import styles from './Login.module.css' assert { type: 'css' };

export default function SignIn() {
  return (
    <form className={styles['form']}>
      <h1 className={styles['title']}>Sign in</h1>

      <label htmlFor="email" className={styles['label']}>
        Email:
      </label>
      <input type="email" id="email" className={styles['input']} />

      <label htmlFor="password" className={styles['label']}>
        Password:
      </label>
      <input type="password" id="password" className={styles['input']} />

      <button type="submit" className={styles['submitButton']}>
        Sign in
      </button>
      <p>
        Don't have an account? <br />
        <a href="">Sign up</a>
      </p>
    </form>
  );
}
