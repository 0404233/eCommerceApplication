
export function getTokenFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|; )customer_token=([^;]*)/);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

export function deleteTokenCookie() {
  document.cookie = 'customer_token=; Max-Age=0; path=/';
}