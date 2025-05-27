import { ReactElement, useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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

export default function UserProfile(): ReactElement {
  const [userData, setUserData] = useState<Customer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [editableAddresses, setEditableAddresses] = useState<EditableAddress[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [formErrors, setFormErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return () => undefined;
  }, [message]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await sdk.getCustomerInfo();
        console.log(data);
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
      } catch (err) {
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
      setUserData((prev) =>
        prev
          ? ({
              ...prev,
              ...formData,
              addresses: editableAddresses,
            } as Customer)
          : prev,
      );
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setEditMode(false);
    } catch (error) {
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
    return (
      <>
        {message && (
          <Alert
            icon={<CheckIcon fontSize="large" />}
            severity={message.type}
            sx={{ mb: 2 }}
          >
            {message.text}
          </Alert>
        )}
      </>
    );
  }

  const { defaultBillingAddressId, defaultShippingAddressId } = userData;

  const countryMap = {
    BY: 'Belarus',
    RU: 'Russia',
    US: 'USA',
  };

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
            <p>
              <strong>Password:</strong> {userData.password}
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
