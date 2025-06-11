import { BaseAddress, Customer } from '@commercetools/platform-sdk';

export interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  addresses?: BaseAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  dateOfBirth?: string;
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

export type GetProductBySearch = {
  id: string;
  name: string;
  slug: string;
};

export type ImageCar = {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
};

export type DetailCarData = {
  name: string;
  description: string;
  price: number;
  discounted?: number;
  images: ImageCar[];
};

export type EditableAddress = {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
};

export type HandleChangePasswordParams = {
  email: string | undefined;
  userId: string;
  version: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setPasswordError: (msg: string | null) => void;
  setLoading: (val: boolean) => void;
  setMessage: (msg: { type: 'success' | 'error'; text: string } | null) => void;
  resetPasswordFields: () => void;
};

export type HandleSaveParams = {
  userData: Customer;
  formData: Partial<Customer>;
  editableAddresses: EditableAddress[];
  defaultBillingId: string | undefined;
  defaultShippingId: string | undefined;
  setFormErrors: (errors: Map<string, string>) => void;
  setMessage: (msg: { type: 'success' | 'error'; text: string } | null) => void;
  setLoading: (loading: boolean) => void;
  setUserData: (data: Customer) => void;
  setEditMode: (edit: boolean) => void;
};

export enum Country {
  Belarus = 'Belarus',
  Russia = 'Russia',
  USA = 'USA',
}
