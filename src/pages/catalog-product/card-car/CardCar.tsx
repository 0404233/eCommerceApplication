import { ReactElement } from 'react';
import styles from './card-car.module.css';
import { Link } from 'react-router';
import AddToCart from '../add-to-cart/AddToCart';

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
  inCart: boolean;
};

export default function CardCar({ id, name, description, price, discount, images, inCart }: CartCar): ReactElement {
  return (
    <div className={styles['card-car-container']}>
      <Link to={`/product/${id}`} className={styles['card-car-wrapper']}>
        <div>
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
      <AddToCart productId={id} disabled={inCart} />
    </div>
  );
}
