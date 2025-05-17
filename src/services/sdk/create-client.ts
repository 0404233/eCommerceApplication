import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { ctpClient } from './client-builder';
import getCustomerToken from '../http/get-customer-token';
import { NavigateFunction } from 'react-router';
import { UserData } from '../../types/types';

export default class SDKInterface {
  private projectKey = import.meta.env['VITE_PROJECT_KEY'];
  public apiRoot = createApiBuilderFromCtpClient(ctpClient()).withProjectKey({
    projectKey: this.projectKey,
  });

  async createCustomer(
    userData: UserData,
    navigate: NavigateFunction,
  ): Promise<void | boolean> {
    try {
      const res: ClientResponse<CustomerSignInResult> = await this.apiRoot
        .customers()
        .post({
          body: {
            ...userData,
          },
        })
        .execute();
      const loginStatus = await this.loginCustomer(userData, navigate);
      return loginStatus;
    } catch (error) {
      console.error(error);
    }
  }

  async loginCustomer(
    userData: UserData,
    navigate: NavigateFunction,
  ): Promise<void | boolean> {
    const { email, password } = userData;

    try {
      await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            ...userData,
          },
        })
        .execute();

      getCustomerToken(email, password);
      navigate('/main');
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export const sdk = new SDKInterface();
