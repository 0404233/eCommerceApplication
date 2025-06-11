export type EditableAddress = {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
};

const validateAddress = (address: EditableAddress): Map<string, string> => {
  const errors = new Map<string, string>();

  if (address.streetName.length === 0) errors.set('streetName', 'Street must contain at least one character.');

  if (!/^[a-zA-Z]+$/.test(address.city) || address.city.length === 0)
    errors.set('city', 'City must have at least one letter, no digits or symbols.');

  if (!/^\d{6}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(address.postalCode))
    errors.set('postalCode', 'Postal code must match the country format.');

  if (!address.country) errors.set('country', 'Country is required');

  return errors;
};

export default validateAddress;
