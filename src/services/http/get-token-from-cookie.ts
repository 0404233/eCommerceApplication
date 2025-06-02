export function getTokenFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )customer_token=([^;]*)/);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

export function createTokenCookie(accessToken: string, refreshToken: string): void {
  document.cookie = `customer_token=${accessToken}; path=/; secure; SameSite=Strict`;
  document.cookie = `customer_refresh_token=${refreshToken}; path=/; secure; SameSite=Strict`;
}

export function deleteTokenCookie(): void {
  document.cookie = 'customer_token=; Max-Age=0; path=/';
  document.cookie = 'customer_refresh_token=; Max-Age=0; path=/';
  document.location.reload();
}

export function getToken(): { accessToken?: string; refreshToken?: string } {
  const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

  const result: { accessToken?: string; refreshToken?: string } = {};

  if ('access_token' in cookies) {
    result.accessToken = cookies['access_token'];
  }

  if ('refresh_token' in cookies) {
    result.refreshToken = cookies['refresh_token'];
  }

  return result;
}
