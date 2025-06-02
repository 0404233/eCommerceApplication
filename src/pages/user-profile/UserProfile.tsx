import { ReactElement, useEffect, useState } from 'react';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import {
  CircularProgress,
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Alert,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { sdk } from '../../services/sdk/create-client';
import styles from './UserProfile.module.css';
import validateUserProfileForm from '../../utils/validate-user-profile-form';

type EditableAddress = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

const validateAddress = (address: EditableAddress) => {
  const errors = new Map<string, string>();
  if (!address.streetName) errors.set('streetName', 'Street is required');
  if (!address.city) errors.set('city', 'City is required');
  if (!address.postalCode) errors.set('postalCode', 'ZIP is required');
  if (!address.country) errors.set('country', 'Country is required');
  return errors;
};

export default function UserProfile(): ReactElement | null {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState(0);
  const [userData, setUserData] = useState<Customer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [editableAddresses, setEditableAddresses] = useState<EditableAddress[]>(
    [],
  );
  const [newAddress, setNewAddress] = useState<EditableAddress>({
    id: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [newAddressErrors, setNewAddressErrors] = useState<Map<string, string>>(
    new Map(),
  );
  const [formErrors, setFormErrors] = useState<Map<string, string>>(new Map());
  const [defaultBillingId, setDefaultBillingId] = useState<
    string | undefined
  >();
  const [defaultShippingId, setDefaultShippingId] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    const timer = message ? setTimeout(() => setMessage(null), 3000) : null;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message]);

  // console.log(editableAddresses);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await sdk.getCustomerInfo();
        setUserData(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          dateOfBirth: data.dateOfBirth || '',
        });
        setEditableAddresses(
          data.addresses.map((addr) => ({
            id: addr.id!,
            streetName: addr.streetName || '',
            city: addr.city || '',
            postalCode: addr.postalCode || '',
            country: addr.country || '',
          })),
        );
        setDefaultBillingId(data.defaultBillingAddressId);
        setDefaultShippingId(data.defaultShippingAddressId);
      } catch {
        setMessage({ type: 'error', text: 'Failed to fetch user data' });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (field: keyof Customer, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (
    index: number,
    field: keyof EditableAddress,
    value: string,
  ) => {
    const updated = [...editableAddresses];
    if (updated[index]) {
      updated[index][field] = value;
      setEditableAddresses(updated);
    }
  };

  const handleDeleteAddress = (id: string) => {
    if (id === defaultBillingId) setDefaultBillingId(undefined);
    if (id === defaultShippingId) setDefaultShippingId(undefined);
    setEditableAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSave = async () => {
    if (!userData) return;

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

      if (formData.firstName !== userData.firstName) {
        actions.push({
          action: 'setFirstName',
          firstName: formData.firstName!,
        });
      }
      if (formData.lastName !== userData.lastName) {
        actions.push({ action: 'setLastName', lastName: formData.lastName! });
      }
      if (formData.email !== userData.email) {
        actions.push({ action: 'changeEmail', email: formData.email! });
      }
      if (formData.dateOfBirth !== userData.dateOfBirth) {
        actions.push({
          action: 'setDateOfBirth',
          dateOfBirth: formData.dateOfBirth!,
        });
      }

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
          const hasChange = [
            'streetName',
            'city',
            'postalCode',
            'country',
          ].some(
            (key) =>
              original?.[key as keyof typeof original] !==
              addr[key as keyof EditableAddress],
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
        if (defaultBillingId) {
          actions.push({
            action: 'setDefaultBillingAddress',
            addressId: defaultBillingId,
          });
        } else if (userData.defaultBillingAddressId) {
          actions.push({
            action: 'removeBillingAddressId',
            addressId: userData.defaultBillingAddressId,
          });
        }
      }

      if (defaultShippingId !== userData.defaultShippingAddressId) {
        if (defaultShippingId) {
          actions.push({
            action: 'setDefaultShippingAddress',
            addressId: defaultShippingId,
          });
        } else if (userData.defaultShippingAddressId) {
          actions.push({
            action: 'removeShippingAddressId',
            addressId: userData.defaultShippingAddressId,
          });
        }
      }

      if (actions.length === 0) {
        setMessage({ type: 'success', text: 'No changes to save.' });
        setEditMode(false);
        return;
      }

      const updatedCustomer = await sdk.updateCustomerProfile(
        userData.version,
        actions,
      );
      setUserData(updatedCustomer);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setEditMode(false);
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <Box className={styles['loader']}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return message ? (
      <Alert
        icon={<CheckIcon fontSize="large" />}
        severity={message.type}
        sx={{ mb: 2 }}
      >
        {message.text}
      </Alert>
    ) : null;
  }

  const countryMap = { BY: 'Belarus', RU: 'Russia', US: 'USA' };

  const handleChangePassword = async () => {
    if (!userData) return;

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

    console.log(userData.id, currentPassword, newPassword)

    try {
      await sdk.changeCustomerPassword({
        id: userData.id,
        version: userData.version,
        currentPassword,
        newPassword,
      });
      setMessage({ type: 'success', text: 'Password changed successfully' });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['profile-container']}>
      <h1>User Profile</h1>

      <Tabs
        className={styles['user-profile__tabs'] ?? ''}
        value={selectedTab}
        onChange={(_, val) => setSelectedTab(val)}
        sx={{ mb: 2, '& .MuiTabs-indicator': { backgroundColor: '#737aff' } }}
        textColor="inherit"
      >
        <Tab label="User Info" />
        <Tab label="Addresses" />
        <Tab label="Change Password" />
      </Tabs>

      {message && (
        <Alert icon={<CheckIcon />} severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={() => setEditMode(!editMode)}
        sx={{ mb: 2, backgroundColor: '#737aff' }}
      >
        {editMode ? 'Cancel' : 'Edit Profile'}
      </Button>

      {selectedTab === 0 && (
        <section className={styles['section']}>
          <h2>Personal Information</h2>
          {editMode ? (
            <>
              <TextField
                className={`${styles['edit-field']}`}
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => handleChange('firstName', e.target.value)}
                fullWidth
                margin="normal"
                error={formErrors.has('firstName')}
                helperText={formErrors.get('firstName')}
              />
              <TextField
                className={`${styles['edit-field']}`}
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => handleChange('lastName', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                className={`${styles['edit-field']}`}
                label="Email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                className={`${styles['edit-field']}`}
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </>
          ) : (
            <>
              <p>
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Date of Birth:</strong> {userData.dateOfBirth}
              </p>
            </>
          )}
        </section>
      )}

      {selectedTab === 1 && (
        <section className={styles['section']}>
          <h2>Addresses</h2>
          {editableAddresses.map((address, index) => (
            <div key={address.id} className={styles['address-card']}>
              {editMode ? (
                <>
                  <TextField
                    className={`${styles['edit-field']}`}
                    label="Street"
                    value={address.streetName}
                    onChange={(e) =>
                      handleAddressChange(index, 'streetName', e.target.value)
                    }
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    className={`${styles['edit-field']}`}
                    label="City"
                    value={address.city}
                    onChange={(e) =>
                      handleAddressChange(index, 'city', e.target.value)
                    }
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    className={`${styles['edit-field']}`}
                    label="ZIP"
                    value={address.postalCode}
                    onChange={(e) =>
                      handleAddressChange(index, 'postalCode', e.target.value)
                    }
                    fullWidth
                    margin="dense"
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="country-label" sx={{ color: '#737aff' }}>
                      Country
                    </InputLabel>
                    <Select
                      value={address.country}
                      onChange={(e) =>
                        handleAddressChange(index, 'country', e.target.value)
                      }
                      label="Country"
                      sx={{
                        color: '#fff',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#737aff',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#737aff',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#737aff',
                        },
                        '.MuiSvgIcon-root': {
                          color: '#737aff',
                        },
                      }}
                    >
                      <MenuItem value="BY">Belarus</MenuItem>
                      <MenuItem value="RU">Russia</MenuItem>
                      <MenuItem value="US">USA</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <label>
                      <input
                        type="radio"
                        name="billing"
                        checked={defaultBillingId === address.id}
                        onChange={() => setDefaultBillingId(address.id)}
                      />
                      Default Billing
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="shipping"
                        checked={defaultShippingId === address.id}
                        onChange={() => setDefaultShippingId(address.id)}
                      />
                      Default Shipping
                    </label>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteAddress(address.id)}
                    sx={{ mt: 1 }}
                  >
                    Delete Address
                  </Button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Street:</strong> {address.streetName}
                  </p>
                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>ZIP:</strong> {address.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong>{' '}
                    {countryMap[address.country as keyof typeof countryMap] ||
                      address.country}
                  </p>
                  {address.id === defaultBillingId && (
                    <p className={styles['billing']}>
                      ✔ Default Billing Address
                    </p>
                  )}
                  {address.id === defaultShippingId && (
                    <p className={styles['shipping']}>
                      ✔ Default Shipping Address
                    </p>
                  )}
                </>
              )}
            </div>
          ))}

          {editMode && (
            <div className={styles['address-card']}>
              <h3>Add New Address</h3>
              <TextField
                className={`${styles['edit-field']}`}
                label="Street"
                value={newAddress.streetName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, streetName: e.target.value })
                }
                fullWidth
                margin="dense"
                error={newAddressErrors.has('streetName')}
                helperText={newAddressErrors.get('streetName')}
              />
              <TextField
                className={`${styles['edit-field']}`}
                label="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                fullWidth
                margin="dense"
                error={newAddressErrors.has('city')}
                helperText={newAddressErrors.get('city')}
              />
              <TextField
                className={`${styles['edit-field']}`}
                label="ZIP"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, postalCode: e.target.value })
                }
                fullWidth
                margin="dense"
                error={newAddressErrors.has('postalCode')}
                helperText={newAddressErrors.get('postalCode')}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="country-label" sx={{ color: '#737aff' }}>
                  Country
                </InputLabel>
                <Select
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                  }
                  label="Country"
                  sx={{
                    color: '#fff',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#737aff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#737aff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#737aff',
                    },
                    '.MuiSvgIcon-root': {
                      color: '#737aff',
                    },
                  }}
                >
                  <MenuItem value="BY">Belarus</MenuItem>
                  <MenuItem value="RU">Russia</MenuItem>
                  <MenuItem value="US">USA</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                onClick={() => {
                  const validationErrors = validateAddress(newAddress);
                  setNewAddressErrors(validationErrors);
                  if (validationErrors.size > 0) return;

                  const newAddr = { ...newAddress, id: crypto.randomUUID() };
                  setEditableAddresses([...editableAddresses, newAddr]);
                  setNewAddress({
                    id: '',
                    streetName: '',
                    city: '',
                    postalCode: '',
                    country: '',
                  });
                  setNewAddressErrors(new Map());
                }}
                sx={{ mt: 1 }}
              >
                Add Address
              </Button>
            </div>
          )}
        </section>
      )}
      {selectedTab === 2 && (
        <section className={styles['section']}>
          <h2>Change Password</h2>
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
            className={`${styles['edit-field']}`}
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '.MuiSvgIcon-root': {
                color: '#737aff',
              },
            }}
          />
          <TextField
            className={`${styles['edit-field']}`}
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '.MuiSvgIcon-root': {
                color: '#737aff',
              },
            }}
          />
          <TextField
            className={`${styles['edit-field']}`}
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#737aff',
              },
              '.MuiSvgIcon-root': {
                color: '#737aff',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleChangePassword}
            sx={{ mt: 2, backgroundColor: '#737aff' }}
          >
            Change Password
          </Button>
        </section>
      )}

      {editMode && (
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{ mt: 2, backgroundColor: '#737aff' }}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
}
