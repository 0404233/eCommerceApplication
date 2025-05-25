import * as React from 'react';
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
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | null;
}

enum CategoriesID {
  FERRARI = 'bcbee2c0-496e-42b8-b6c5-0203f2b89865',
  BUGATTI = 'e5eac371-fe66-444f-918c-8aa445942e2a',
  LAMBORGHINI = '756f7061-f9fe-475b-81ac-f74cb1a9cd0f',
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return <div>{value === index && <Box>{children}</Box>}</div>;
}

export default function BasicTabs(): React.ReactElement {
  const [value, setValue] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function carsCategory(id: string) {
    sdk.apiRoot
      .productProjections()

      .get({
        queryArgs: {
          where: `categories(id="${id}")`,
          limit: 20,
        },
      })
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          setProducts(res.body.results);
          console.log(res);
        }
      });
  }

  function GetCars() {
    return products.map(({ id, name, description, masterVariant }) => {
      const price = masterVariant?.prices?.[0]?.value?.centAmount;
      const images = masterVariant?.images;

      return (
        <CardCar
          key={id}
          name={name['en-US']}
          description={description?.['en-US']}
          price={Number(price)}
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
          '& .MuiTabs-indicator': {
            display: 'none',
          },

          backgroundColor: '#cacaca',
        }}
      >
        <Tab
          disableRipple
          label={<Brand src={lamborghini} alt={'lamborghini'} brand={'lamborghini'} />}
          onClick={() => carsCategory(CategoriesID.LAMBORGHINI)}
        />
        <Tab
          disableRipple
          label={<Brand src={ferrari} alt={'ferrari'} brand={'ferrari'} />}
          onClick={() => carsCategory(CategoriesID.FERRARI)}
        />
        <Tab
          disableRipple
          label={<Brand src={bugatti} alt={'bugatti'} brand={'bugatti'} />}
          onClick={() => carsCategory(CategoriesID.BUGATTI)}
        />
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
