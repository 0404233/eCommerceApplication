import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';

export default function ArrowTooltips(): ReactElement {
  return (
    <Tooltip
      title="Default Ship / Bill Address"
      arrow
      slotProps={{
        tooltip: {
          sx: {
            fontSize: '14px',
          },
        },
      }}
    >
      <span>Set default address?</span>
    </Tooltip>
  );
}
