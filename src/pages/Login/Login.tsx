import { FormEvent, useEffect, useState } from 'react';
import classes from './Login.module.css' assert { type: 'css' };
import { useNavigate } from 'react-router';
import { sdk } from '../../services/SDK/createClient';
import getCustomerToken from '../../services/http/getCustomerToken';

import { userData } from '../../userData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [attrLogin, setAttrLogin] = useState('false');
  const [attrPassword, setAttrPassword] = useState('false');

  const validateEmailAndPassword = (email: string, password: string) => {
    const regexSymbolDog = /^[^\s@]+@[^\s@]+$/;
    const regexSymbolPoint = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const regexLowerLettersPassword = /[a-z]/;
    const regexUpperLettersPassword = /[A-Z]/;
    const regexDigitPassword = /[0-9]/;
    const regexTrimSpacesPassword = /^\S.*\S$|^\S$|^$/;

    const newErrors = {
      email: '',
      password: '',
    };

    if (!email) {
      newErrors.email = 'Fill in the email address.';
    } else if (!regexSymbolDog.test(email)) {
      newErrors.email =
        'Symbol "@" must be present in the email address and should not be at the end.';
    } else if (!regexSymbolPoint.test(email)) {
      newErrors.email =
        'Symbol "." must be present in the email address and should not be at the end.';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
    } else if (!regexLowerLettersPassword.test(password)) {
      newErrors.password =
        'Password must contain at least one LOWERcase English letter.';
    } else if (!regexUpperLettersPassword.test(password)) {
      newErrors.password =
        'Password must contain at least one UPPERcase English letter.';
    } else if (!regexDigitPassword.test(password)) {
      newErrors.password = 'Password must contain at least one digit.';
    } else if (!regexTrimSpacesPassword.test(password)) {
      newErrors.password =
        'The password must not contain leading or trailing spaces.';
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    const findErrors = validateEmailAndPassword(email, password);

    if (findErrors.email) {
      valid = false;
      setAttrLogin('true');
    } else {
      setAttrLogin('false');
    }

    if (findErrors.password) {
      valid = false;
      setAttrPassword('true');
    } else {
      setAttrPassword('false');
    }

    setErrors(findErrors);

    if (valid) {
      sdk.loginCustomer({ email, password }, navigate);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  return (
    <form className={classes['form-login']} onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        autoComplete="username"
        className={classes['form-login__input']}
        placeholder="your@email.com"
        onChange={(e) => setEmail(e.target.value)}
        data-error={attrLogin}
      />

      {errors.email && (
        <span className={classes['form-login__error']}>{errors.email}</span>
      )}

      <label htmlFor="password">Password</label>
      <div className={classes['password-container']}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className={classes['form-login__input']}
          placeholder="********"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          data-error={attrPassword}
        />
        <span
          className={classes['toggle-password']}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🔓' : '🔒'}
        </span>
      </div>
      {errors.password && (
        <span className={classes['form-login__error']}>{errors.password}</span>
      )}

      <button type="submit" className={classes['form-login__btn']}>
        Sign in
      </button>
      <p>
        Don't have an account?{' '}
        <a onClick={() => navigate('/register')}>Sign up</a>
      </p>
    </form>
  );
}
