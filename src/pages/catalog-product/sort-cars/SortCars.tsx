import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement, useEffect, useState } from 'react';
import { sdk } from '../../../services/sdk/create-client';
import { ProductProjection } from '@commercetools/platform-sdk';

interface GroupedSelectProps {
  onSort: (products: ProductProjection[]) => void;
  categoryId: string | undefined;
}

export default function GroupedSelect({ onSort, categoryId }: GroupedSelectProps): ReactElement {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const sortProducts = async () => {
      if (!categoryId) return;

      if (!value) {
        try {
          const res = await sdk.getCarsCategory(categoryId);
          if (res) onSort(res);
        } catch (err) {
          console.error('Reset error:', err);
        }
        return;
      }

      let field = '';

      switch (value) {
        case 'price_asc':
          field = 'price asc';
          break;
        case 'price_desc':
          field = 'price desc';
          break;
        case 'name_asc':
          field = 'variants.attributes.name asc';
          break;
        case 'name_desc':
          field = 'variants.attributes.name desc';
          break;
        case 'year_asc':
          field = 'variants.attributes.year asc';
          break;
        case 'year_desc':
          field = 'variants.attributes.year desc';
          break;
        default:
          return;
      }

      try {
        const res = await sdk.sortByOptions(field, categoryId);
        if (res) onSort(res.body.results);
      } catch (err) {
        console.error('Sorting error:', err);
      }
    };

    sortProducts();
  }, [value, onSort, categoryId]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }} variant="outlined">
        <InputLabel sx={{ color: '#fff', '&.Mui-focused': { color: '#fff' } }}>Sort by</InputLabel>
        <Select
          value={value}
          label="Sort by"
          onChange={handleChange}
          sx={{
            color: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="name_asc">Name: A → Z</MenuItem>
          <MenuItem value="name_desc">Name: Z → A</MenuItem>
          <MenuItem value="year_asc">Year: Low to High</MenuItem>
          <MenuItem value="year_desc">Year:High to Low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
