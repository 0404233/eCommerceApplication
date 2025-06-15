import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  MyCustomerUpdateAction,
  CustomerChangePassword,
  Customer,
  Cart,
} from '@commercetools/platform-sdk';
import { ctpClient } from './client-builder';
import getCustomerToken from '../http/get-customer-token';
import { UserData } from '../../types/types';
import { LoginResponse } from '../../types/types';
import { getAnonymousCartId } from '../../utils/set-get-cart-id';
import { getUserId, setUserId } from '../../utils/set-get-user-id';

export default class CreateClient {
  private projectKey = import.meta.env['VITE_PROJECT_KEY'];
  public apiRoot = createApiBuilderFromCtpClient(ctpClient()).withProjectKey({
    projectKey: this.projectKey,
  });
  user = {
    userName: '',
    password: '',
  };

  public refreshApiRoot(credentials?: { username: string; password: string }): void {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient(credentials)).withProjectKey({
      projectKey: this.projectKey,
    });
  }

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
      const anonymousCartId = getAnonymousCartId();
      await getCustomerToken(email, password);

      const res = await this.apiRoot
        .login()
        .post({
          body: {
            email,
            password,
            anonymousCart: {
              id: anonymousCartId || '',
              typeId: 'cart',
            },
          },
        })
        .execute();

      setUserId(res.body.customer.id);
      this.refreshApiRoot({ username: email, password: password });

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
      const res = await this.apiRoot
        .productProjections()
        .get({
          queryArgs: {
            where: `categories(id="${id}")`,
            limit: 20,
          },
        })
        .execute();

      return res.body.results;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async sortByOptions(sort: string, categoryId: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': [`categories.id:"${categoryId}"`],
          sort,
          priceCurrency: 'USD',
        },
      })
      .execute();
  }

  async getProductBySearch(text: string): Promise<ProductProjection[]> {
    const res = await this.apiRoot
      .productProjections()
      .get({ queryArgs: { limit: 100 } })
      .execute();

    const filtered = res.body.results.filter((product) => {
      const name = product.name?.['en-US']?.toLowerCase() || '';
      return name.includes(text.toLowerCase());
    });

    return filtered;
  }

  async getProductById(id: string): Promise<ProductProjection> {
    try {
      const data = await this.apiRoot.productProjections().withId({ ID: id }).get().execute();
      return data.body;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async getCustomerInfo(): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => res);
  }

  async updateCustomerProfile(version: number, actions: MyCustomerUpdateAction[]): Promise<Customer> {
    return this.apiRoot
      .me()
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute()
      .then((res) => res.body);
  }

  async changeCustomerPassword(data: CustomerChangePassword): Promise<Customer> {
    const { version, currentPassword, newPassword } = data;
    return this.apiRoot
      .me()
      .password()
      .post({
        body: {
          version,
          currentPassword,
          newPassword,
        },
      })
      .execute()
      .then((res) => res.body);
  }

  async getCustomerCart(): Promise<ClientResponse<Cart> | undefined> {
    const userId = getUserId();
    if (userId) {
      return await this.apiRoot.carts().withCustomerId({ customerId: userId }).get().execute();
    }
    return undefined;
  }

  async getAnonCart(anonymousCartId: string): Promise<ClientResponse<Cart>> {
    return await this.apiRoot.carts().withId({ ID: anonymousCartId }).get().execute();
  }

  async addProductToCart(cartResponse: ClientResponse<Cart>, productId: string): Promise<void> {
    const { id, version } = cartResponse.body;
    await this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [{ action: 'addLineItem', productId: productId }],
        },
      })
      .execute();
  }

  async deleteProductFromCart(id: string, version: number, lineItemId: string): Promise<void> {
    await this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [{ action: 'removeLineItem', lineItemId: lineItemId }],
        },
      })
      .execute();
  }

  async createNewCart(): Promise<ClientResponse<Cart>> {
    return this.apiRoot
      .carts()
      .post({ body: { currency: 'USD', country: 'US' } })
      .execute();
  }
}

export const sdk = new CreateClient();
