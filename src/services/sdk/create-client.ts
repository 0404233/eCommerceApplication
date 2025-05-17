import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './client-builder';
import getCustomerToken from '../http/get-customer-token';
import { NavigateFunction } from 'react-router';
import { UserData } from '../../types/types';

export default class SDKInterface {
  private projectKey = import.meta.env['VITE_PROJECT_KEY'];
  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: this.projectKey,
  });


  async createCustomer(userData: UserData, navigate: NavigateFunction) {
    try {
      const res = await this.apiRoot
        .customers()
        .post({
          body: {
            ...userData,
          },
        })
        .execute();

      if (res.statusCode === 201) {
        navigate('/login');
      }

      // navigate('/login')
      // await this.loginCustomer(userData, navigate)
    } catch (error) {
     
    }
  }

  async loginCustomer(userData: UserData, navigate: NavigateFunction) {
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
    } catch (error: any) {
      return error?.body?.message;
    }
  }
}

export const sdk = new SDKInterface();
