import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './client-builder';
import getCustomerToken from '../http/get-customer-token';
import { UserData } from '../../types/types';
import { LoginResponse } from '../../types/types';

export default class SDKInterface {
  private projectKey = import.meta.env['VITE_PROJECT_KEY'];
  public apiRoot = createApiBuilderFromCtpClient(ctpClient()).withProjectKey({
    projectKey: this.projectKey,
  });

  async createCustomer(userData: UserData): Promise<LoginResponse> {
    try {
      await this.apiRoot
        .customers()
        .post({
          body: {
            ...userData,
          },
        })
        .execute();

      await this.loginCustomer(userData);

      return {
        success: true,
        message: 'The account was created successfully!',
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  async loginCustomer(userData: UserData): Promise<LoginResponse> {
    const { email, password } = userData;

    try {
      await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      getCustomerToken(email, password);
      return {
        success: true,
        message: 'Login completed successfully!',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}

export const sdk = new SDKInterface();
