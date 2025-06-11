type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function validateForm(formData: FormData): Map<string, string> {
  const { email, password, firstName, lastName, dateOfBirth, streetName, city, postalCode, country } = { ...formData };

  const newMap = new Map();

  if (!/\S+@\S+\.\S+/.test(email) || email === '') {
    newMap.set('email', 'Please enter a valid email address.');
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
    newMap.set('password', 'Use at least 8 characters, incl. upper/lowercase & digits.');
  }

  if (!/^[a-zA-Z]+$/.test(firstName) || firstName.length === 0) {
    newMap.set('firstName', 'First name must have at least one letter, no digits or symbols.');
  }

  if (!/^[a-zA-Z]+$/.test(lastName) || lastName.length === 0) {
    newMap.set('lastName', 'Last name must have at least one letter, no digits or symbols.');
  }

  const today = new Date();
  const dobCheck = new Date(dateOfBirth);

  if (!dateOfBirth) newMap.set('dob', 'Please enter a valid birthday');

  const age = today.getFullYear() - dobCheck.getFullYear();

  if (
    age < 13 ||
    (age === 13 && today.getMonth() < dobCheck.getMonth()) ||
    (age === 13 && today.getMonth() === dobCheck.getMonth() && today.getDate() < dobCheck.getDate())
  ) {
    newMap.set('dob', 'You must be at least 13 years old.');
  }

  if (streetName.length === 0) {
    newMap.set('street', 'Street must contain at least one character.');
  }

  if (!/^[a-zA-Z]+$/.test(city) || city.length === 0) {
    newMap.set('city', 'City must have at least one letter, no digits or symbols.');
  }

  if (!/^\d{6}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode)) {
    newMap.set('postalCode', 'Postal code must match the country format.');
  }

  if (country === '') {
    newMap.set('country', 'Please select a country from the list.');
  }

  return newMap;
}
