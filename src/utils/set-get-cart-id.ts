export const setAnonymousCartId = (anonymousCartId: string): void => {
  document.cookie = `anonymousCartId=${anonymousCartId}; path=/; secure; SameSite=Strict`;
};

export const getAnonymousCartId = (): string | null => {
  const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

  return 'anonymousCartId' in cookies ? cookies['anonymousCartId'] : null;
};
