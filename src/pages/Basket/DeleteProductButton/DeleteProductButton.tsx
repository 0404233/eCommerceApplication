import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { JSX } from 'react';

type Props = {
  textContent: string;
  callback: () => void;
  fullWidth?: boolean;
};

export default function DeleteProductButton({ textContent, callback, fullWidth }: Props): JSX.Element {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteForeverIcon />}
      onClick={callback}
      sx={{
        alignSelf: fullWidth ? 'auto' : 'flex-start',
        padding: '3px 12px',
        fontSize: '12px',
        marginTop: 'auto',
        color: '#959595',
        borderColor: '#6a6a6a',
        '&:hover': {
          color: '#b0b0b0',
          borderColor: '#7e7e7e',
          backgroundColor: 'rgba(106, 106, 106, 0.08)',
        },
        '& .MuiButton-startIcon': {
          color: 'inherit',
        },
      }}
    >
      {textContent}
    </Button>
  );
}
