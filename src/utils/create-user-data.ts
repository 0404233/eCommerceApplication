import { UserData } from '../types/types';
import countryFormatter from './date-formatter';

type DatasForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
};

type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

function createAddresses(address: Address, billingAdress: Address) {
  const shipping = {
    country: countryFormatter(address.country),
    city: address.city,
    streetName: address.streetName,
    postalCode: address.postalCode,
  };

  let billing;

  if (billingAdress.city) billing = { ...billingAdress };

  const addresses = billing ? [shipping, billing] : [shipping];

  return addresses;
}

export default function createUserData(
  datasForm: DatasForm,
  isDefaultAddress: boolean,
  billingAdress: Address,
): UserData {
  const addresses = createAddresses(datasForm, billingAdress);

  const userData: UserData = {
    firstName: datasForm.firstName,
    lastName: datasForm.lastName,
    email: datasForm.email,
    password: datasForm.password,
    addresses: addresses,
    defaultShippingAddress: 0,
    dateOfBirth: datasForm.dateOfBirth  
  };

  if (isDefaultAddress) userData.defaultBillingAddress = 0;
  if (addresses[1]) userData.defaultBillingAddress = 1;

  return userData;
}
