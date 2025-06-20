import { sdk } from '../services/sdk/create-client';
import getCustomerToken from '../services/http/get-customer-token';
import { deleteTokenCookie } from '../services/http/get-token-from-cookie';
import { HandleChangePasswordParams } from '../types/types';

export const handleChangePassword = async ({
  email,
  userId,
  version,
  currentPassword,
  newPassword,
  confirmPassword,
  setPasswordError,
  setLoading,
  setMessage,
  resetPasswordFields,
}: HandleChangePasswordParams) => {
  if (newPassword !== confirmPassword) {
    setPasswordError('Passwords do not match');
    return;
  }

  if (newPassword.length < 8) {
    setPasswordError('Password must be at least 8 characters');
    return;
  }

  setPasswordError(null);
  setLoading(true);
  setMessage(null);

  try {
    await sdk.changeCustomerPassword({
      id: userId,
      version,
      currentPassword,
      newPassword,
    });

    setMessage({ type: 'success', text: 'Password changed successfully' });
    resetPasswordFields();
    deleteTokenCookie();
    getCustomerToken(email!, newPassword);
  } catch (err) {
    setMessage({ type: 'error', text: 'Failed to change password' });
  } finally {
    setLoading(false);
  }
};
