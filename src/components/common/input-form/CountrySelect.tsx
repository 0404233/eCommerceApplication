import { ReactElement } from 'react';
import classes from '../../../pages/Registration/Registration.module.css';

type CountrySelect = {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  newErrors: Map<string, string>;
};

export default function CountrySelect({
  country,
  setCountry,
  newErrors,
}: CountrySelect): ReactElement {
  return (
    <>
      <label htmlFor="country">Country</label>
      <select
        id="country"
        value={country}
        className={`${classes['form-register__input']} ${newErrors.has('country') ? classes['input-error'] : ''}`}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value=""></option>
        <option value="Russia">Russia</option>
        <option value="USA">USA</option>
        <option value="Belarus">Belarus</option>
      </select>
    </>
  );
}
