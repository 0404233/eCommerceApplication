import { ReactElement } from 'react';
import styles from './brand.module.css';

type Brand = {
  src: string;
  alt: string;
  brand: string;
};

export default function Brand({ src, alt, brand }: Brand): ReactElement {
  return (
    <>
      <div className={styles['car-container']}>
        <img className={styles['car']} src={src} alt={alt} />
      </div>
      <span className={styles['brand-name']}>{brand}</span>
    </>
  );
}
