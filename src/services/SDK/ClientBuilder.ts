import {
  ClientBuilder,
  type AuthMiddlewareOptions, 
  type HttpMiddlewareOptions, 
} from '@commercetools/sdk-client-v2';


const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
const API_URL = import.meta.env['VITE_API_URL'];
const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];
const SCOPES = import.meta.env['VITE_SCOPES'];
const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];


const projectKey = PROJECT_KEY;
const scopes = SCOPES.split(' ')

// Configure authMiddlewareOptions
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

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

// Configure PasswordAuthMiddlewareOptions
// const passwordFlow: PasswordAuthMiddlewareOptions = {
//   host: AUTH_URL,
//   projectKey: projectKey,
//   credentials: {
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     user: {
//       // username: process.env.USERNAME,
//       // password: process.env.PASSWORD,
//     },
//   },
//   scopes: [`manage_project:${projectKey}`],
//   fetch,
// };

// Configure AnonymousAuthMiddlewareOptions
// const options: AnonymousAuthMiddlewareOptions = {
//   host: AUTH_URL,
//   projectKey: 'test-project-key',
//   credentials: {
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     anonymousId: process.env.CTP_ANONYMOUS_ID, // a unique id
//   },
//   scopes: [`manage_project:${projectKey}`],
//   fetch,
// };

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)  
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() 
  .build();
