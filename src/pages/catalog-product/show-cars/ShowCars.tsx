import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Brand from '../brand/Brand';
import ferrari from '../../../assets/images/catalog-title/ferrari.jpg';
import bugatti from '../../../assets/images/catalog-title/bugatti.jpg';
import lamborghini from '../../../assets/images/catalog-title/lamborghini.jpg';

import { sdk } from '../../../services/sdk/create-client';
import { ProductProjection } from '@commercetools/platform-sdk';
import CardCar from '../card-car/CardCar';
import { useEffect, useState } from 'react';
import GroupedSelect from '../sort-cars/SortCars';
import SearchProduct from '../search-product/SearchProduct';
import styles from './show-cars.module.css';
import { getAnonymousCartId } from '../../../utils/set-get-cart-id';
import LoadingSpinner from '../../../components/common/loading-spinner/LoadingSpinner';

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
  const [lineItemsId, setLineItemsId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProductInTheShoppingCart = async () => {
      const cartId = getAnonymousCartId();

      if (!cartId) return;

      try {
        const res = await sdk.apiRoot.carts().withId({ ID: cartId }).get().execute();

        const { lineItems } = res.body;

        const ids = lineItems?.map((item) => item.productId) || [];
        setLineItemsId(ids);
      } catch (error) {
        console.error('Error:', error);
        setLineItemsId([]);
      }
    };

    checkProductInTheShoppingCart();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const categoryId = CATEGORY_MAP[value];
      if (!categoryId) return;

      try {
        const results = await sdk.getCarsCategory(categoryId);
        setProducts(results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setProducts([]);
      }
    };

    fetchData();
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearchInputChange = async (text: string) => {
    setSearchText(text);

    const categoryId = CATEGORY_MAP[value];
    if (!categoryId) return;

    if (!text.trim()) {
      try {
        const results = await sdk.getCarsCategory(categoryId);
        setProducts(results);
      } catch (error) {
        console.error('Error fetching category products on clear:', error);
        setProducts([]);
      }
      return;
    }

    try {
      const searchResults = await sdk.getProductBySearch(text);
      setProducts(searchResults);
    } catch (error) {
      console.error('Error searching for products:', error);
      setProducts([]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name?.['en-US']?.toLowerCase() || '';
    return name.includes(searchText.toLowerCase());
  });

  function GetCars({ products, lineItemsId }: { products: ProductProjection[]; lineItemsId: string[] }) {
    return products.map(({ id, name, description, masterVariant }) => {
      const price = Number(masterVariant?.prices?.[0]?.value?.centAmount) / 100;
      const images = masterVariant?.images;
      const discount = Number(masterVariant?.prices?.[0]?.discounted?.value?.centAmount) / 100;

      const inCart = lineItemsId.includes(id);

      return (
        <CardCar
          key={id}
          id={id}
          name={name['en-US']}
          description={description?.['en-US']}
          price={price}
          discount={discount}
          images={images}
          inCart={inCart}
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
        <Tab disableRipple label={<Brand src={lamborghini} alt="lamborghini" brand="lamborghini" />} />
        <Tab disableRipple label={<Brand src={ferrari} alt="ferrari" brand="ferrari" />} />
        <Tab disableRipple label={<Brand src={bugatti} alt="bugatti" brand="bugatti" />} />
      </Tabs>

      <div className={styles['show-cars-wrapper']}>
        <GroupedSelect onSort={setProducts} categoryId={CATEGORY_MAP[value]} />
        <SearchProduct inputValue={searchText} onInputChange={handleSearchInputChange} />
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <CustomTabPanel value={value} index={0}>
            <GetCars products={filteredProducts} lineItemsId={lineItemsId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <GetCars products={filteredProducts} lineItemsId={lineItemsId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <GetCars products={filteredProducts} lineItemsId={lineItemsId} />
          </CustomTabPanel>
        </>
      )}
    </>
  );
}
