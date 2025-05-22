import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  ThemeProvider,
  MenuItem,
} from '@mui/material';
import { customSwithTheme } from '../switch-button/switch-button-theme';
import { BillingAdressOptions } from '../../../types/types';
import { useState } from 'react';
import countryFormatter from '../../../utils/date-formatter';

type Props = {
  onAddBillingAddress: (options: BillingAdressOptions) => void;
};

export default function PopupForm({
  onAddBillingAddress,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isBillingAddressExist, setIsBillingAddressExist] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const clearFields = () => {
    setStreetName('');
    setCity('');
    setPostalCode('');
    setCountry('');
    onAddBillingAddress({ streetName, city, postalCode, country });
  };

  const handleSwitchChange = () => {
    if (!isBillingAddressExist) {
      setOpen(true);
    } else {
      setIsBillingAddressExist(false);
      clearFields();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors(new Map());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = new Map<string, string>();

    if (streetName.trim().length === 0) {
      newErrors.set('streetName', 'Street is required.');
    }

    if (!/^[a-zA-Z\s]+$/.test(city) || city.trim().length === 0) {
      newErrors.set('city', 'City must contain only letters.');
    }

    if (!/^\d{6}$/.test(postalCode)) {
      newErrors.set('postalCode', 'Postal code must be exactly 6 digits.');
    }

    if (!country) {
      newErrors.set('country', 'Please select a country.');
    }

    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleSumbit = () => {
    if (validate()) {
      onAddBillingAddress({
        country: countryFormatter(country),
        city,
        streetName,
        postalCode,
      });
      setOpen(false);
      setIsBillingAddressExist(true);
      setErrors(new Map());
    }
  };

  return (
    <div>
      <FormControlLabel
        control={
          <ThemeProvider theme={customSwithTheme}>
            <Switch
              checked={isBillingAddressExist}
              onChange={handleSwitchChange}
              color="success"
            />
          </ThemeProvider>
        }
        label="Add billing address?"
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '15px',
          },
          ml: 0,
          mr: 0,
        }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Billing Address</DialogTitle>
        <DialogContent sx={{ maxWidth: '360px' }}>
          <TextField
            label="Street"
            fullWidth
            margin="dense"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            error={errors.has('streetName')}
            helperText={errors.get('streetName')}
          />
          <TextField
            label="City"
            fullWidth
            margin="dense"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={errors.has('city')}
            helperText={errors.get('city')}
          />
          <TextField
            label="Postal code"
            fullWidth
            margin="dense"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                inputProps: { maxLength: 6 },
              },
            }}
            error={errors.has('postalCode')}
            helperText={errors.get('postalCode')}
          />
          <TextField
            select
            label="Country"
            fullWidth
            margin="dense"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={errors.has('country')}
            helperText={errors.get('country')}
          >
            <MenuItem value="Russia">Russia</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Belarus">Belarus</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSumbit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
