import { BaseAddress } from "@commercetools/platform-sdk";

export interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  addresses?: BaseAddress[];
}