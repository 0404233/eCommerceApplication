import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  async getCarsCategory(id: string): Promise<ProductProjection[]> {
    try {
      const res = await sdk.apiRoot
        .productProjections()
        .get({
          queryArgs: {
            where: `categories(id="${id}")`,
            limit: 20,
          },
        })
        .execute();
      console.log(res);

      return res.body.results;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async sortByOptions(sort: string, categoryId: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return await sdk.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': [`categories.id:"${categoryId}"`],
          sort,
          priceCurrency: 'USD',
          staged: true,
        },
      })
      .execute();
  }

  async getProductBySearch(text: string): Promise<ProductProjection[]> {
    const res = await sdk.apiRoot
      .productProjections()
      .get({ queryArgs: { limit: 100 } })
      .execute();

    const filtered = res.body.results.filter((product) => {
      const name = product.name?.['en-US']?.toLowerCase() || '';
      return name.includes(text.toLowerCase());
    });

    return filtered;
  }
}

export const sdk = new SDKInterface();
