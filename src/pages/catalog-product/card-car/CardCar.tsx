import { ReactElement } from 'react';
import styles from './card-car.module.css';
import { Link, useNavigate } from 'react-router';

type Image = {
  url?: string;
  label?: string;
};

type CartCar = {
  id: string;
  name: string | undefined;
  description: string | undefined;
  price: number;
  discount: number;
  images: Image[] | undefined;
};

export default function CardCar({ id, name, description, price, discount, images }: CartCar): ReactElement {
  return (
    <Link to={`/product/${id}`} style={{ color: '#fff', fontWeight: 'normal' }}>
      <div className={styles['card-car-container']}>
        <h2 className={styles['card-title']}>{name}</h2>
        <div className={styles['img-wrapper']}>
          <img className={styles['card-img']} src={images?.[0]?.url} alt={images?.[0]?.label} />
        </div>
        <div className={styles['price-wrapper']}>
          {discount ? (
            <>
              <span className={styles['discount-price']}>{discount}$</span>
              <span className={styles['old-price']}>{price}$</span>
            </>
          ) : (
            <p className={styles['card-price']}>{price}$</p>
          )}
        </div>
        <p className={styles['card-description']}>{description}</p>
      </div>
    </Link>
  );
}
