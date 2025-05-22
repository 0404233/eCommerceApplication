import { createTokenCookie } from './get-token-from-cookie';

const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];
const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];

export default async function getCustomerToken(
  username: string,
  password: string,
): Promise<void> {
  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const params = new URLSearchParams({
    grant_type: 'password',
    username: username,
    password: password,
    scope: `view_published_products:${PROJECT_KEY} manage_my_orders:${PROJECT_KEY} manage_my_profile:${PROJECT_KEY}`,
  });

  return await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: params.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      createTokenCookie(data.access_token, data.refresh_token);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
