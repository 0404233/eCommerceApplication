

export interface userData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  addresses?: BaseAddress[]
}

interface BaseAddress {
  country: string;
  city?: string;
  streetName?: string;
  postalCode?: string;

}