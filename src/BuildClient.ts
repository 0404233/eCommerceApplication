import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';

const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
const API_URL = import.meta.env['VITE_API_URL'];
const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];
const SCOPES = import.meta.env['VITE_SCOPES'];
const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];

const projectKey = `${PROJECT_KEY}`;
const scopes = [`${SCOPES}`];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `${AUTH_URL}`,
  projectKey: projectKey,
  credentials: {
    clientId: `${CLIENT_ID}`,
    clientSecret: `${CLIENT_SECRET}`,
  },
  scopes,
  httpClient: fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${API_URL}`,
  httpClient: fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
