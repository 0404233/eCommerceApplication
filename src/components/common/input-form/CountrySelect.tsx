import { ReactElement } from 'react';
import classes from '../../../pages/Registration/Registration.module.css';

type CountrySelect = {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  newErrors: Map<string, string>;
};

const COUNTRIES = ['Russia', 'USA', 'Belarus'];

export default function CountrySelect({ country, setCountry, newErrors }: CountrySelect): ReactElement {
  return (
    <>
      <label htmlFor="country">Country</label>
      <select
        id="country"
        value={country}
        className={`${classes['form-register__input']} ${newErrors.has('country') ? classes['input-error'] : ''}`}
        onChange={(e) => setCountry(e.target.value)}
      >
        {COUNTRIES.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </>
  );
}
