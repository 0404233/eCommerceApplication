export function getTokenFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )customer_token=([^;]*)/);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

export function createTokenCookie(
  accessToken: string,
  refreshToken: string,
): void {
  document.cookie = `customer_token=${accessToken}; path=/; secure; SameSite=Strict`;
  document.cookie = `customer_refresh_token=${refreshToken}; path=/; secure; SameSite=Strict`;
}

export function deleteTokenCookie(): void {
  document.cookie = 'customer_token=; Max-Age=0; path=/';
  document.cookie = 'customer_refresh_token=; Max-Age=0; path=/';
  document.location.reload();
}

export function getToken(): (string | undefined)[] {
  const cookie = document.cookie;
  return cookie.split('; ').map((el) => el.split('=')[1]);
}
