import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './detailed-product.module.css';
import { sdk } from '../../services/sdk/create-client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { extractDetails } from '../../utils/extract-details';
import { DetailCarData } from '../../types/types';
import Slider from '../../components/common/slider/Slider';
import AddToCart from '../catalog-product/add-to-cart/AddToCart';
import { getAnonymousCartId } from '../../utils/set-get-cart-id';
import { getToken } from '../../services/http/get-token-from-cookie';
import { getUserId } from '../../utils/set-get-user-id';
import RemoveFromCart from './remove-from-cart/RemoveFromCart';

export default function DetailedProduct(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<DetailCarData | null>(null);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const product: ProductProjection = await sdk.getProductById(id);
          const detailData = extractDetails(product);
          setCarData(detailData);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setCarData(null);
        }
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const getCurrentCart = async () => {
      const anonymousCartId = getAnonymousCartId();
      const { refreshToken } = getToken();

      if (refreshToken) {
        const userId = getUserId();
        if (userId) {
          const cartResponse = await sdk.getCustomerCart();
          if (cartResponse) {
            const lineItems = cartResponse.body.lineItems;
            setIsProductInCart(lineItems.some((product) => product.productId === id));
          }
        }
      } else if (anonymousCartId) {
        const cartResponse = await sdk.getAnonCart(anonymousCartId);
        if (cartResponse) {
          const lineItems = cartResponse.body.lineItems;
          setIsProductInCart(lineItems.some((product) => product.productId === id));
        }
      }
    };

    getCurrentCart();
  }, [id]);

  const handleDisabled = () => {
    setIsProductInCart(!isProductInCart);
  };

  return (
    <div className={styles['detailed-product']}>
      {carData && id && (
        <div className={styles['detailed-product-container']}>
          <div className={styles['detailed-product-slider']}>
            <Slider images={carData.images} />
          </div>
          <div className={styles['detailed-product-info']}>
            <h1 className={styles['detailed-product-title']}>{carData.name}</h1>
            <p className={styles['price-container']}>
              <span className={styles['active-price']}>${carData.discounted ?? carData.price}</span>
              {carData.discounted && <span className={styles['full-price']}>${carData.price}</span>}
            </p>
            <p className={styles['detailed-product-description']}>{carData.description}</p>
            <div className={styles['addToCart']} onClick={handleDisabled}>
              {isProductInCart && <RemoveFromCart productId={id} />}
              {!isProductInCart && <AddToCart productId={id} disabled={isProductInCart} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
