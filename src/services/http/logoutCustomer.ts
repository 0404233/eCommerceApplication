export async function logoutCustomer(
  token: string,
  tokenTypeHint: 'access_token' | 'refresh_token',
) {
  const clientId = import.meta.env['VITE_CLIENT_ID'];
  const clientSecret = import.meta.env['VITE_CLIENT_SECRET'];
  const authUrl = import.meta.env['VITE_AUTH_URL'];

  const credentials = btoa(`${clientId}:${clientSecret}`);

  const body = new URLSearchParams({
    token,
    token_type_hint: tokenTypeHint,
  });

  const response = await fetch(`${authUrl}/oauth/token/revoke`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to revoke token: ${response.status} - ${errorText}`,
    );
  }

  console.log(`✅ Token revoked successfully`);
}
