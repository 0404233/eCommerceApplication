import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Brand from '../brand/Brand';
import lamborghini from '../../../assets/images/catalog-title/lamborghini.png';
import ferrari from '../../../assets/images/catalog-title/ferrari.png';
import bugatti from '../../../assets/images/catalog-title/bugatti.png';
import { sdk } from '../../../services/sdk/create-client';
import { ProductProjection } from '@commercetools/platform-sdk';
import CardCar from '../card-car/CardCar';
import { useEffect, useState } from 'react';
import GroupedSelect from '../sort-cars/SortCars';
import SearchProduct from '../search-product/SearchProduct';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CATEGORY_MAP = [
  '756f7061-f9fe-475b-81ac-f74cb1a9cd0f',
  'bcbee2c0-496e-42b8-b6c5-0203f2b89865',
  'e5eac371-fe66-444f-918c-8aa445942e2a',
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ padding: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ShowCars(): React.ReactElement {
  const [value, setValue] = useState<number>(0);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!CATEGORY_MAP[value]) return;

      const results = await sdk.getCarsCategory(CATEGORY_MAP[value]);
      setProducts(results);
    };

    fetchData();
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearchInputChange = async (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      const categoryId = CATEGORY_MAP[value];
      if (!categoryId) return;

      const results = await sdk.getCarsCategory(categoryId);
      setProducts(results);
      return;
    }

    try {
      const searchResults = await sdk.getProductBySearch(text);
      setProducts(searchResults);
    } catch (error) {
      console.error('Ошибка при поиске товаров:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name?.['en-US']?.toLowerCase() || '';
    return name.includes(searchText.toLowerCase());
  });

  function GetCars({ products }: { products: ProductProjection[] }) {
    return products.map(({ id, name, description, masterVariant }) => {
      const price = Number(masterVariant?.prices?.[0]?.value?.centAmount) / 100;
      const images = masterVariant?.images;
      const discount = Number(masterVariant?.prices?.[0]?.discounted?.value?.centAmount) / 100;

      return (
        <CardCar
          key={id}
          id={id}
          name={name['en-US']}
          description={description?.['en-US']}
          price={price}
          discount={discount}
          images={images}
        />
      );
    });
  }

  return (
    <>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiTab-root': {
            outline: 'none',
            border: 'none',
          },
          '& .MuiTab-root:focus': {
            outline: 'none',
          },
          '& .MuiTab-root.Mui-selected': {
            color: '#646cff',
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          backgroundColor: '#cacaca',
        }}
      >
        <Tab disableRipple label={<Brand src={lamborghini} alt={'lamborghini'} brand={'lamborghini'} />} />
        <Tab disableRipple label={<Brand src={ferrari} alt={'ferrari'} brand={'ferrari'} />} />
        <Tab disableRipple label={<Brand src={bugatti} alt={'bugatti'} brand={'bugatti'} />} />
      </Tabs>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <GroupedSelect onSort={setProducts} categoryId={CATEGORY_MAP[value]} />
        <SearchProduct inputValue={searchText} onInputChange={handleSearchInputChange} />
      </div>
      <CustomTabPanel value={value} index={0}>
        <GetCars products={filteredProducts} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GetCars products={filteredProducts} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GetCars products={filteredProducts} />
      </CustomTabPanel>
    </>
  );
}
