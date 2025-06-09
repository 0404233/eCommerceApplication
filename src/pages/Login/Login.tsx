import { FormEvent, ReactElement, useEffect, useState } from 'react';
import classes from './login.module.css';
import { useNavigate } from 'react-router';
import { sdk } from '../../services/sdk/create-client';
import { userData } from '../../utils/user-data';
import { LoginResponse, LoginStatus } from '../../types/types';
import AuthAlert from '../../components/common/auth-alert/AuthAlert';
import SignUpLink from '../../components/common/form-links/SignUpLink';
import ButtonSignIn from '../../components/common/form-links/ButtonSignIn';
import FormInput from '../../components/common/input-form/FormInput';
import validateForm from '../../utils/validate-form-login';

export default function Login({ changeLoginStatus }: LoginStatus): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [loginResponse, setLoginResponse] = useState<LoginResponse>({
    success: false,
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const loginStatus = userData.getUserLogin();
      if (loginStatus === true) {
        navigate('/');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    const findErrors = validateForm(email, password);

    if (findErrors.email || findErrors.password) valid = false;

    if (valid) {
      const result = await sdk.loginCustomer({ email, password });

      sdk.refreshApiRoot();

      if (result && result.success !== true) {
        setErrors({
          email: '',
          password: '',
        });
        setIsOpenAlert(true);
        setLoginResponse(result);
      } else {
        changeLoginStatus(true);
        navigate('/');
      }
    } else {
      setErrors(findErrors);
    }
  };

  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <form className={classes['form-login']} onSubmit={handleSubmit}>
      {isOpenAlert && <AuthAlert response={loginResponse} onCloseAlert={onCloseAlert} />}
      <h1>Sign in</h1>

      <FormInput
        label="Email"
        id="email"
        value={email}
        onChange={setEmail}
        error={errors['email']}
        autocomplete={'username'}
        placeholder="Email"
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors['password']}
        autocomplete={'current-password'}
        isLoginPage={true}
        placeholder="Password"
      />
      <ButtonSignIn />
      <SignUpLink />
    </form>
  );
}
