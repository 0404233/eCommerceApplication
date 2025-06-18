import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState, type ReactElement } from 'react';
import { PromocodeAlert } from '../../types/types';

type Props = {
  display: PromocodeAlert;
  closeAlert: () => void;
};

export default function PromoAlert({ display, closeAlert }: Props): ReactElement {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={1500}
      onClose={() => {
        setOpen(false);
        closeAlert();
      }}
    >
      <Alert
        severity={display.severity}
        onClose={() => {
          setOpen(false);
          closeAlert();
        }}
      >
        {display.message}
      </Alert>
    </Snackbar>
  );
}
