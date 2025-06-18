export const setUserId = (UserId: string): void => {
  document.cookie = `userId=${UserId}; path=/; secure; SameSite=Strict`;
};

export const getUserId = (): string | null => {
  const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

  return 'userId' in cookies ? cookies['userId'] : null;
};
