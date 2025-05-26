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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function BasicTabs(): React.ReactElement {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const categoryMap = [
      '756f7061-f9fe-475b-81ac-f74cb1a9cd0f',
      'bcbee2c0-496e-42b8-b6c5-0203f2b89865',
      'e5eac371-fe66-444f-918c-8aa445942e2a',
    ];

    const fetchData = async () => {
      if (!categoryMap[value]) return;

      const results = await sdk.carsCategory(categoryMap[value]);
      setProducts(results);
    };

    fetchData();
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function GetCars() {
    return products.map(({ id, name, description, masterVariant }) => {
      const price = masterVariant?.prices?.[0]?.value?.centAmount;
      const images = masterVariant?.images;
      const discount = masterVariant?.prices?.[0]?.discounted?.value?.centAmount;

      return (
        <CardCar
          key={id}
          name={name['en-US']}
          description={description?.['en-US']}
          price={Number(price) / 100}
          discount={Number(discount) / 100}
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
      <CustomTabPanel value={value} index={0}>
        <GetCars />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GetCars />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GetCars />
      </CustomTabPanel>
    </>
  );
}
