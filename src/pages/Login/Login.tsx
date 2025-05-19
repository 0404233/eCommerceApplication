import { FormEvent, ReactElement, useEffect, useState } from 'react';
import classes from './login.module.css';
import { useNavigate } from 'react-router';
import { sdk } from '../../services/sdk/create-client';
import { userLoginStatus } from '../../utils/user-data';
import { LoginResponse, LoginStatus } from '../../types/types';
import AuthAlert from '../../components/common/auth-alert/AuthAlert';

export default function Login({
  changeLoginStatus,
}: LoginStatus): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [attrLogin, setAttrLogin] = useState(false);
  const [attrPassword, setAttrPassword] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [loginResponse, setLoginResponse] = useState<LoginResponse>({
    success: false,
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const loginStatus = userLoginStatus.getUserData();
      if (loginStatus === true) {
        navigate('/');
      }
    }, 300);
  }, []);

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
      newErrors.email = 'Email needs @ (not last character)';
    } else if (!regexSymbolPoint.test(email)) {
      newErrors.email = '"." required in email, not last character.';
    }

    if (password.length < 8) {
      newErrors.password = 'Min 8 characters for password.';
    } else if (!regexLowerLettersPassword.test(password)) {
      newErrors.password = 'Needs 1+ lowercase letter.';
    } else if (!regexUpperLettersPassword.test(password)) {
      newErrors.password = 'Include an uppercase letter.';
    } else if (!regexDigitPassword.test(password)) {
      newErrors.password = 'At least one number required.';
    } else if (!regexTrimSpacesPassword.test(password)) {
      newErrors.password = 'Password cannot start or end with spaces.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    const findErrors = validateEmailAndPassword(email, password);

    if (findErrors.email) {
      valid = false;
      setAttrLogin(true);
    } else {
      setAttrLogin(false);
    }

    if (findErrors.password) {
      valid = false;
      setAttrPassword(true);
    } else {
      setAttrPassword(false);
    }

    setErrors(findErrors);

    if (valid) {
      const result = await sdk.loginCustomer({ email, password });

      if (result && result.success !== true) {
        setErrors({
          email: '',
          password: '',
        });
        setAttrLogin(true);
        setAttrPassword(true);
        setIsOpenAlert(true);
        setLoginResponse(result);
      } else {
        changeLoginStatus(true);
        navigate('/');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <form className={classes['form-login']} onSubmit={handleSubmit}>
      {isOpenAlert && (
        <AuthAlert response={loginResponse} onCloseAlert={onCloseAlert} />
      )}
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
      <p style={{ textAlign: 'center' }}>
        Don't have an account?{' '}
        <a onClick={() => navigate('/register')}>Sign up</a>
        <br />
        <a style={{ fontSize: '20px' }} onClick={() => navigate('/main')}>
          Go to Store
        </a>
      </p>
    </form>
  );
}
