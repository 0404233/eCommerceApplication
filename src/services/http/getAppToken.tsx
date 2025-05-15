const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];
const SCOPES = import.meta.env['VITE_SCOPES'];

export default async function getAppToken(): Promise<string> {
  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: SCOPES,
  });

  const response = await fetch(`${AUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: params.toString(),
  });

  const data = await response.json();

  return data.access_token;
}
