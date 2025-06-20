import { ReactElement } from 'react';
import classes from '../../../pages/Registration/Registration.module.css';
import { Country } from '../../../types/types';
import { COUNTRIES } from '../../../utils/countries';

type CountrySelect = {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<keyof typeof Country>>;
  newErrors: Map<string, string>;
};

export default function CountrySelect({ country, setCountry, newErrors }: CountrySelect): ReactElement {
  return (
    <>
      <label htmlFor="country">Country</label>
      <select
        id="country"
        value={country || 'Belarus'}
        className={`${classes['form-register__input']} ${newErrors.has('country') ? classes['input-error'] : ''}`}
        onChange={(e) => setCountry(e.target.value as keyof typeof Country)}
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
