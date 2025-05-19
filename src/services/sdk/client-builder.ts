import {
  Client,
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { getToken } from '../http/get-token-from-cookie';

const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
const API_URL = import.meta.env['VITE_API_URL'];
const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];
const SCOPES = import.meta.env['VITE_SCOPES'];
const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];

const projectKey = PROJECT_KEY;
const scopes = SCOPES.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

export const ctpClient = (): Client => {
  const [accessToken, refreshToken] = getToken();

  if (!accessToken) {
    return new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }

  return new ClientBuilder()
    .withRefreshTokenFlow({
      host: AUTH_URL,
      projectKey: projectKey,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      refreshToken: refreshToken || '',
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};
