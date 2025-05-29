import { useNavigate } from 'react-router';
import classes from './registration.module.css';
import { FormEvent, ReactElement, useState } from 'react';
import { sdk } from '../../services/sdk/create-client';
import { BillingAdressOptions, LoginResponse } from '../../types/types';
import AuthAlert from '../../components/common/auth-alert/AuthAlert';
import SwitchButton from '../../components/common/switch-button/SwitchButton';
import PopupForm from '../../components/common/popup-form/PopupForm';
import validateForm from '../../utils/validate-form-register';
import createUserData from '../../utils/create-user-data';
import Tooltip from '../../components/common/tooltip/Tooltip';
import FormInput from '../../components/common/input-form/FormInput';
import CountrySelect from '../../components/common/input-form/CountrySelect';
import ButtonSignUp from '../../components/common/form-links/ButtonSignUp';
import SignInLink from '../../components/common/form-links/SignInLink';

export default function Registration(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [newErrors, setNewErrors] = useState(new Map());
  const [createCustomerResponse, setCreateCustomerResponse] = useState<LoginResponse>({
    success: false,
    message: '',
  });
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [billingAdress, setBillingAdress] = useState<BillingAdressOptions>({
    country,
    city,
    streetName,
    postalCode,
  });

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefaultAddress(event.target.checked);
  };

  const navigate = useNavigate();

  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datasForm = {
      email,
      password,
      firstName,
      lastName,
      dob,
      streetName,
      city,
      postalCode,
      country,
    };

    const errors = validateForm(datasForm);
    setNewErrors(errors);

    if (errors.size === 0) {
      const userData = createUserData(datasForm, isDefaultAddress, billingAdress);

      const response = await sdk.createCustomer(userData);
      setCreateCustomerResponse(response);
      setIsOpenAlert(true);
      if (response.success) {
        setTimeout(() => {
          navigate('/main');
          window.location.reload();
        }, 1500);
      }
    }
  };

  const onAddBillingAddress = (options: BillingAdressOptions): void => {
    setBillingAdress({ ...options });
  };

  return (
    <form className={classes['form-register']} onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      {isOpenAlert && <AuthAlert response={createCustomerResponse} onCloseAlert={onCloseAlert} />}
      <div className={classes['form-register__inputs-wrapper']}>
        <div className={classes['form-register__input-container']}>
          <FormInput
            label="Email"
            id="email"
            value={email}
            onChange={setEmail}
            error={newErrors.get('email')}
            autocomplete={'username'}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
            error={newErrors.get('password')}
            autocomplete={'current-password'}
          />
          <FormInput
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={setFirstName}
            error={newErrors.get('firstName')}
          />
          <FormInput
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={setLastName}
            error={newErrors.get('lastName')}
          />
          <FormInput
            label="Date of Birth"
            id="dob"
            type="date"
            value={dob}
            onChange={setDob}
            error={newErrors.get('dob')}
          />
        </div>

        <div className={classes['form-register__input-container']}>
          <FormInput
            label="Street"
            id="street"
            value={streetName}
            onChange={setStreetName}
            error={newErrors.get('street')}
          />
          <FormInput label="City" id="city" value={city} onChange={setCity} error={newErrors.get('city')} />
          <FormInput
            label="Postal Code"
            id="postalCode"
            value={postalCode}
            onChange={setPostalCode}
            maxLength={6}
            error={newErrors.get('postalCode')}
          />
          <CountrySelect country={country} setCountry={setCountry} newErrors={newErrors} />
          {newErrors.has('country') && (
            <span className={classes['form-register__error']}>{newErrors.get('country')}</span>
          )}

          <div className={classes['address-container']}>
            <SwitchButton checked={isDefaultAddress} onChange={handleSwitchChange} />
            <Tooltip />
          </div>

          <PopupForm onAddBillingAddress={onAddBillingAddress} />
        </div>
      </div>
      <ButtonSignUp />
      <SignInLink />
    </form>
  );
}
