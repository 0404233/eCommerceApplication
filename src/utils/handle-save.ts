import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { EditableAddress } from './validate-address';
import { sdk } from '../services/sdk/create-client';
import validateUserProfileForm from './validate-user-profile-form';
import { HandleSaveParams } from '../types/types';

export const handleSave = async ({
  userData,
  formData,
  editableAddresses,
  defaultBillingId,
  defaultShippingId,
  setFormErrors,
  setMessage,
  setLoading,
  setUserData,
  setEditMode,
}: HandleSaveParams) => {
  const errors = validateUserProfileForm(formData, editableAddresses);
  setFormErrors(errors);
  if (errors.size > 0) return;

  if (!defaultBillingId || !defaultShippingId) {
    setMessage({
      type: 'error',
      text: 'Please set default billing and shipping addresses.',
    });
    return;
  }

  setLoading(true);
  setMessage(null);

  try {
    const actions: MyCustomerUpdateAction[] = [];

    if (formData.firstName !== userData.firstName)
      actions.push({ action: 'setFirstName', firstName: formData.firstName! });

    if (formData.lastName !== userData.lastName)
      actions.push({ action: 'setLastName', lastName: formData.lastName! });

    if (formData.email !== userData.email)
      actions.push({ action: 'changeEmail', email: formData.email! });

    if (formData.dateOfBirth !== userData.dateOfBirth)
      actions.push({ action: 'setDateOfBirth', dateOfBirth: formData.dateOfBirth! });

    const existingIds = new Set(userData.addresses.map((a) => a.id));
    const currentIds = new Set(editableAddresses.map((a) => a.id));

    userData.addresses.forEach((addr) => {
      if (!currentIds.has(addr.id!)) {
        actions.push({ action: 'removeAddress', addressId: addr.id! });
      }
    });

    editableAddresses.forEach((addr) => {
      if (!existingIds.has(addr.id)) {
        actions.push({
          action: 'addAddress',
          address: {
            streetName: addr.streetName,
            city: addr.city,
            postalCode: addr.postalCode,
            country: addr.country,
          },
        });
      } else {
        const original = userData.addresses.find((a) => a.id === addr.id);
        const hasChange = ['streetName', 'city', 'postalCode', 'country'].some(
          (key) => original?.[key as keyof typeof original] !== addr[key as keyof EditableAddress]
        );
        if (hasChange) {
          actions.push({
            action: 'changeAddress',
            addressId: addr.id,
            address: {
              ...original,
              streetName: addr.streetName,
              city: addr.city,
              postalCode: addr.postalCode,
              country: addr.country,
            },
          });
        }
      }
    });

    if (defaultBillingId !== userData.defaultBillingAddressId) {
      if (!userData.billingAddressIds?.includes(defaultBillingId)) {
        actions.push({ action: 'addBillingAddressId', addressId: defaultBillingId });
      }
      actions.push({ action: 'setDefaultBillingAddress', addressId: defaultBillingId });
    }

    if (defaultShippingId !== userData.defaultShippingAddressId) {
      if (!userData.shippingAddressIds?.includes(defaultShippingId)) {
        actions.push({ action: 'removeShippingAddressId', addressId: userData.defaultShippingAddressId! });
        actions.push({ action: 'addShippingAddressId', addressId: defaultShippingId });
      }
      actions.push({ action: 'setDefaultShippingAddress', addressId: defaultShippingId });
    }

    if (actions.length === 0) {
      setMessage({ type: 'success', text: 'No changes to save.' });
      setEditMode(false);
      return;
    }

    const updatedCustomer = await sdk.updateCustomerProfile(userData.version, actions);
    setUserData(updatedCustomer);
    setMessage({ type: 'success', text: 'Profile updated successfully' });
    setEditMode(false);
    window.location.reload();
  } catch {
    setMessage({ type: 'error', text: 'Failed to update profile' });
  } finally {
    setLoading(false);
  }
};
