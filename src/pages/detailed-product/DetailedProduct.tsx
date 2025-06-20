import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './detailed-product.module.css';
import { sdk } from '../../services/sdk/create-client';
import { ProductProjection } from '@commercetools/platform-sdk';
import { extractDetails } from '../../utils/extract-details';
import { DetailCarData } from '../../types/types';
import Slider from '../../components/common/slider/Slider';

export default function DetailedProduct(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<DetailCarData | null>(null);

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

  return (
    <main className={styles['detailed-product']}>
      {carData && (
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
            <button className={styles['add-product']}>add to basket</button>
          </div>
        </div>
      )}
    </main>
  );
}
