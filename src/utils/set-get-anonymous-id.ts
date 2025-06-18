export const setAnonymousId = (anonymousId: string): void => {
  document.cookie = `anonymousId=${anonymousId}; path=/; secure; SameSite=Strict`;
};

export const getAnonymousId = (): string | null => {
  const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

  return 'anonymousId' in cookies ? cookies['anonymousId'] : null;
};
