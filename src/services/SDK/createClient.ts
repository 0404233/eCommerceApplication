import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ClientBuilder';
import getCustomerToken from '../http/getCustomerToken';
import { NavigateFunction } from 'react-router';
import { userData } from '../../types/types';

// interface userAddresses {
//   country: string;
//   city?: string;
//   street?: string;
//   postalCode?: string;
// }

// interface userData {
//   firstname?: string;
//   lastname?: string;
//   email: string;
//   password: string;
//   addresses?: userAddresses[]
// }

export default class SDKInterface {
  // static instance: SDKInterface;
  private projectKey = import.meta.env['VITE_PROJECT_KEY'];

  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: this.projectKey,
  });

  // public static getInstance(): SDKInterface {
  //   if (!SDKInterface.instance) {
  //     SDKInterface.instance = new SDKInterface();
  //   }
  //   return SDKInterface.instance;
  // }

  /* 
      Registration
  */
  async createCustomer(userData: userData, navigate: NavigateFunction) {
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
      console.log(error);
    }
  }

  /* 
      Login
  */
  async loginCustomer(userData: userData, navigate: NavigateFunction) {
    const { email, password } = userData;

    try {
      const response = await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            ...userData,
          },
        })
        .execute();

      console.log('Customer signed in:', response.body.customer);
      getCustomerToken(email, password);
      navigate('/main');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}

export const sdk = new SDKInterface();
