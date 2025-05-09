import { useNavigate } from 'react-router';
import classes from './Registration.module.css';
import { FormEvent, useState } from 'react';

export default function Registration() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [newErrors, setNewErrors] = useState(new Map());

  const navigate = useNavigate();

  function validateForm() {
    const newMap = new Map();

    if (!/\S+@\S+\.\S+/.test(email) || email === '') {
      newMap.set('email', "Please enter a valid email address.");
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
      newMap.set('password', "Password must be at least 8 characters long and include uppercase letters, lowercase letters, and digits.");
    }

    if (!/^[a-zA-Z]+$/.test(firstName) || firstName.length === 0) {
      newMap.set('firstName', 'First name must contain at least one character and cannot contain special characters or digits.');
    }

    if (!/^[a-zA-Z]+$/.test(lastName) || lastName.length === 0) {
      newMap.set('lastName', 'Last name must contain at least one character and cannot contain special characters or digits.');
    }

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 13 || (age === 13 && today.getMonth() < dob.getMonth()) ||
      (age === 13 && today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      newMap.set('dob', 'You must be at least 13 years old.');
    }

    if (street.length === 0) {
      newMap.set('street', 'Street must contain at least one character.');
    }

    if (!/^[a-zA-Z]+$/.test(city) || city.length === 0) {
      newMap.set('city', 'City must contain at least one character and cannot contain special characters or digits.');
    }

    if (!/^\d{6}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode)) {
      newMap.set('postalCode', 'Postal code must match the country format.');
    }

    if (country === "") {
      newMap.set('country', 'Please select a country from the list.');
    }

    setNewErrors(newMap);

    return newMap.size === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Здесь можно добавить код для отправки формы на сервер
      // Сбросить поля формы после успешной отправки
      resetForm();
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setDob(new Date());
    setStreet('');
    setCity('');
    setPostalCode('');
    setCountry('');
    setNewErrors(new Map());
  };

  return (
    <form className={classes["form-register"]} onSubmit={handleSubmit}>

      <h1>Sign up</h1>

      <div className={classes["form-register__inputs-wrapper"]}>

        <div className={classes["form-register__input-container"]}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="username"
            type="text"
            placeholder="your@email.com"
            className={`${classes["form-register__input"]} ${newErrors.has('email') ? classes["input-error"] : ''}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {newErrors.has('email') && <p className={classes["form-register__error"]}>{newErrors.get('email')}</p>}

          <label id="password" htmlFor="email">Password</label>
          <input
            id="password"
            autoComplete="current-password"
            type="password"
            placeholder="********"
            className={`${classes["form-register__input"]} ${newErrors.has('password') ? classes["input-error"] : ''}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {newErrors.has('password') && <p className={classes["form-register__error"]}>{newErrors.get('password')}</p>}

          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Ivan"
            className={`${classes["form-register__input"]} ${newErrors.has('firstName') ? classes["input-error"] : ''}`}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {newErrors.has('firstName') && (<p className={classes["form-register__error"]}>{newErrors.get('firstName')}</p>)}

          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Ivanov"
            className={`${classes["form-register__input"]} ${newErrors.has('lastName') ? classes["input-error"] : ''}`}
            onChange={(e) => setLastName(e.target.value)}
          />
          {newErrors.has('lastName') && <p className={classes["form-register__error"]}>{newErrors.get('lastName')}</p>}

          <label htmlFor="dob">Date of Birthday</label>
          <input
            id="dob"
            type="date"
            className={`${classes["form-register__input"]} ${newErrors.has('dob') ? classes["input-error"] : ''}`}
            onChange={(e) => setDob(new Date(e.target.value))}
          />
          {newErrors.has('dob') && <p className={classes["form-register__error"]}>{newErrors.get('dob')}</p>}
        </div>

        <div className={classes["form-register__input-container"]}>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            placeholder="Arbatskaya"
            className={`${classes["form-register__input"]} ${newErrors.has('street') ? classes["input-error"] : ''}`}
            onChange={(e) => setStreet(e.target.value)}
          />
          {newErrors.has('street') && <p className={classes["form-register__error"]}>{newErrors.get('street')}</p>}

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="Moscow"
            className={`${classes["form-register__input"]} ${newErrors.has('city') ? classes["input-error"] : ''}`}
            onChange={(e) => setCity(e.target.value)}
          />
          {newErrors.has('city') && <p className={classes["form-register__error"]}>{newErrors.get('city')}</p>}

          <label htmlFor="postalCode">Postal code</label>
          <input
            id="postalCode"
            type="text"
            maxLength={6}
            placeholder="141345"
            className={`${classes["form-register__input"]} ${newErrors.has('postalCode') ? classes["input-error"] : ''}`}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {newErrors.has('postalCode') && <p className={classes["form-register__error"]}>{newErrors.get('postalCode')}</p>}

          <label htmlFor="country">Country</label>
          <select
            id="country"
            className={`${classes["form-register__input"]} ${newErrors.has('country') ? classes["input-error"] : ''}`}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value=""></option>
            <option value="Russian">Russian</option>
            <option value="USA">USA</option>
            <option value="Belarus">Belarus</option>
          </select>
          {newErrors.has('country') && <p className={classes["form-register__error"]}>{newErrors.get('country')}</p>}
        </div>
      </div>
      <button className={classes["form-register__btn"]} type="submit">Sign up</button>
      <p>Already have an account? <a onClick={() => navigate('/login')}>Sign in</a></p>
    </form>
  )
}



