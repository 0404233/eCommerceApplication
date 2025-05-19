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

type Props = {
  onAddBillingAdress: (options: BillingAdressOptions) => void;
};

export default function PopupForm({
  onAddBillingAdress,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSumbit = () => {
    onAddBillingAdress({ streetName, city, postalCode, country });
    setOpen(false);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <ThemeProvider theme={customSwithTheme}>
            <Switch
              checked={open}
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
          />
          <TextField
            label="City"
            fullWidth
            margin="dense"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          />
          <TextField
            select
            label="Country"
            fullWidth
            margin="dense"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
