import { JSX, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
  inputValue: string;
  onInputChange: (value: string) => void;
}

export default function SearchProduct({ inputValue, onInputChange }: ComboBoxProps): JSX.Element {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (!inputValue.trim()) return;
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={[]}
      sx={{
        width: 300,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#fff',
          },
          '&:hover fieldset': {
            borderColor: '#fff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#fff',
          },
        },
        '& .MuiFormLabel-root': {
          color: '#fff',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#fff',
        },
        '& .MuiAutocomplete-endAdornment': { color: '#fff' },
        '& .MuiSvgIcon-root': { color: '#fff' },
        '& .MuiInputBase-input': { color: '#fff' },
      }}
      onInputChange={(_, value) => onInputChange(value)}
      renderInput={({ InputLabelProps: _InputLabelProps, ...restParams }) => (
        <TextField
          {...restParams}
          label="Search product by name"
          variant="outlined"
          size="medium"
          fullWidth
          slotProps={{
            inputLabel: {
              className: _InputLabelProps?.className ?? '',
            },
          }}
        />
      )}
    />
  );
}
