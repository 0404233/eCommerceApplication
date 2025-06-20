type FormErrors = {
  email: string;
  password: string;
};

export default function validateForm(
  email: string,
  password: string,
): FormErrors {
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
}
