import { BaseAddress } from '@commercetools/platform-sdk';

export interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  addresses?: BaseAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export type LoginResponse = {
  success: boolean;
  message: string;
};

export interface LoginStatus {
  changeLoginStatus: (status: boolean) => void;
}

export interface SwitchButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type BillingAdressOptions = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};
