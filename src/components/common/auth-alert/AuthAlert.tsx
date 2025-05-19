import { ReactElement, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { LoginResponse } from '../../../types/types';

type Props = {
  response: LoginResponse;
  onCloseAlert: () => void;
};

export function AuthAlert({ response, onCloseAlert }: Props): ReactElement {
  const [open, setOpen] = useState(true);
  const [alertType, setAlertType] = useState<'success' | 'error'>(
    response.success ? 'success' : 'error',
  );
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={1500}
      onClose={() => {
        setOpen(false);
        onCloseAlert();
      }}
    >
      <Alert
        severity={alertType}
        onClose={() => {
          setOpen(false);
          onCloseAlert();
        }}
      >
        {response.message}
      </Alert>
    </Snackbar>
  );
}

export default AuthAlert;
