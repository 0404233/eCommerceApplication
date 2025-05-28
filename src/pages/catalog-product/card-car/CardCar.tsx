import { ReactElement } from 'react';
import styles from './card-car.module.css';
import { useNavigate } from 'react-router';
type Image = {
  url?: string;
  label?: string;
};

type CartCar = {
  name?: string | undefined;
  description?: string | undefined;
  price?: number;
  discount?: number;
  images?: Image[] | undefined;
};

export default function CardCar({ name, description, price, images, discount }: CartCar): ReactElement {
  const navigate = useNavigate();
  return (
    <div className={styles['card-car-container']} onClick={() => navigate('/product')}>
      <h2 className={styles['card-title']}>{name}</h2>
      <img className={styles['card-img']} src={images?.[0]?.url} alt={images?.[0]?.label} />
      <div>
        {discount ? (
          <>
            <p className={styles['old-price']}>Price: {price}$</p>
            <p className={styles['discount-price']}>Discount: {discount}$</p>
          </>
        ) : (
          <p className={styles['card-price']}>{price}</p>
        )}
      </div>
      <p className={styles['card-description']}>Description: {description}</p>
    </div>
  );
}
