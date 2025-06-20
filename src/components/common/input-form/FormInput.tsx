import { ReactElement, useState } from 'react';
import classes from '../../../pages/Registration/Registration.module.css';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'email';
  autocomplete?: string;
  isLoginPage?: boolean;
}

export default function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  inputMode,
  autocomplete,
  isLoginPage,
}: FormInputProps): ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = `${classes['form-register__input']} ${error ? classes['input-error'] : ''}`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes['input-wrapper']}>
      <label htmlFor={id}>{label}</label>

      <div className={classes['input-container']}>
        <input
          id={id}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          className={inputClass}
          autoComplete={autocomplete}
        />
        {isLoginPage && (
          <span
            className={classes['toggle-password']}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🔓' : '🔒'}
          </span>
        )}
      </div>

      {error && <p className={classes['form-register__error']}>{error}</p>}
    </div>
  );
}
