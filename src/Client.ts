import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient'; // Assuming your client is defined here

export default class SDKInterface {
  private static instance: SDKInterface;
  private PROJECT_KEY = import.meta.env[
    'VITE_PROJECT_KEY'
  ];
  private apiRoot =
    createApiBuilderFromCtpClient(
      ctpClient,
    ).withProjectKey({
      projectKey: this.PROJECT_KEY,
    });

  private constructor() {}

  public static getInstance(): SDKInterface {
    if (!SDKInterface.instance) {
      SDKInterface.instance =
        new SDKInterface();
    }
    return SDKInterface.instance;
  }

  public async createCustomer(
    email: string,
    password: string,
  ) {
    const response = await this.apiRoot
      .customers()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response;
  }
}
