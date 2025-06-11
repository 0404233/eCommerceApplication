import * as React from 'react';
import Switch from '@mui/material/Switch';
import { ThemeProvider } from '@mui/material/styles';
import { customSwithTheme } from './switch-button-theme';
import { SwitchButtonProps } from '../../../types/types';

export default function SwitchButton({ checked, onChange }: SwitchButtonProps): React.ReactElement {
  return (
    <ThemeProvider theme={customSwithTheme}>
      <Switch checked={checked} onChange={onChange} name="address" color="success" />
    </ThemeProvider>
  );
}
