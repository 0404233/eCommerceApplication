import { ReactElement, useEffect, useState } from 'react';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { sdk } from '../../services/sdk/create-client';
import styles from './UserProfile.module.css';
import validateUserProfileForm from '../../utils/validate-user-profile-form';

const validateAddress = (address: EditableAddress) => {
  const errors = new Map<string, string>();
  if (!address.streetName) errors.set('streetName', 'Street is required');
  if (!address.city) errors.set('city', 'City is required');
  if (!address.postalCode) errors.set('postalCode', 'ZIP is required');
  if (!address.country) errors.set('country', 'Country is required');
  return errors;
};

type EditableAddress = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function UserProfile(): ReactElement {
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [formErrors, setFormErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
    return;
  }, [message]);

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

  const handleSave = async () => {
    if (!userData) return;

    const errors = validateUserProfileForm(formData, editableAddresses);
    setFormErrors(errors);
    if (errors.size > 0) return;

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
    ) : (
      <></>
    );
  }

  const { defaultBillingAddressId, defaultShippingAddressId } = userData;
  const countryMap = { BY: 'Belarus', RU: 'Russia', US: 'USA' };

  return (
    <div className={styles['profile-container']}>
      <h1>User Profile</h1>

      {message && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={message.type}
          sx={{ mb: 2 }}
        >
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

      <section className={styles['section']}>
        <h2>Addresses</h2>
        {editableAddresses.map((address, index) => (
          <div key={index} className={styles['address-card']}>
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
                <TextField
                  className={`${styles['edit-field']}`}
                  label="Country"
                  value={address.country}
                  onChange={(e) =>
                    handleAddressChange(index, 'country', e.target.value)
                  }
                  fullWidth
                  margin="dense"
                />
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
              </>
            )}
            {address.id === defaultBillingAddressId && (
              <p className={styles['billing']}>✔ Default Billing Address</p>
            )}
            {address.id === defaultShippingAddressId && (
              <p className={styles['shipping']}>✔ Default Shipping Address</p>
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
            <TextField
              className={`${styles['edit-field']}`}
              label="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              fullWidth
              margin="dense"
              error={newAddressErrors.has('country')}
              helperText={newAddressErrors.get('country')}
            />
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
