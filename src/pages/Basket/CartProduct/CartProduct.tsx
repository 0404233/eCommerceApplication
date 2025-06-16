import { ChangeEvent, JSX, useState } from 'react';
import styles from './cart-product.module.css';
import type { LineItem } from '@commercetools/platform-sdk';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteProductButton from '../DeleteProductButton/DeleteProductButton';

type Props = {
  lineItem: LineItem;
  updateLineItemQuantity: (lineItemId: string, quantity: number) => void;
};

export default function CartProduct({ lineItem, updateLineItemQuantity }: Props): JSX.Element {
  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const newQuantity = Number(e.target.value);
      const next = newQuantity > 0 ? newQuantity : lineItem.quantity;
      updateLineItemQuantity(lineItem.id, next);
    }
  };

  const onReduceQuantity = () => {
    const next = lineItem.quantity - 1 > 0 ? lineItem.quantity - 1 : lineItem.quantity;
    updateLineItemQuantity(lineItem.id, next);
  };

  const onIncreaseQuantity = () => {
    const next = lineItem.quantity + 1;
    updateLineItemQuantity(lineItem.id, next);
  };

  return (
    <li className={styles['cart-product']}>
      <div className={styles['product-image-container']}>
        {lineItem.variant.images?.length && <img src={lineItem.variant.images[0]?.url} alt="Product image" />}
      </div>
      <div className={styles['product-info-container']}>
        <div className={styles['product-title']}>{lineItem.name?.['en-US']}</div>
        <div className={styles['product-attributes']}>
          <div className={styles['cart-product-attribute']} style={{ backgroundColor: '#ffa500' }}>
            {lineItem.variant.attributes![0]!.value}
          </div>
          <div
            className={styles['cart-product-attribute']}
            style={{ backgroundColor: lineItem.variant.attributes![2]!.value }}
          >
            {lineItem.variant.attributes![2]!.value}
          </div>
        </div>
        <DeleteProductButton callback={() => updateLineItemQuantity(lineItem.id, 0)} textContent="remove" />
      </div>
      <p className={styles['price-container']}>
        <span className={styles['active-price']}>
          ${lineItem.totalPrice.centAmount / 10 ** lineItem.totalPrice.fractionDigits}
        </span>
        {lineItem.price.discounted && (
          <span className={styles['full-price']}>
            ${(lineItem.price.value.centAmount / 10 ** lineItem.price.value.fractionDigits) * lineItem.quantity}
          </span>
        )}
      </p>
      <div className={styles['product-quantity']}>
        <button className={styles['quantity-btn']} onClick={onReduceQuantity}>
          <RemoveIcon fontSize="small" sx={{ color: '#dfdfdf' }} />
        </button>
        <input className={styles['quality-input']} type="number" value={lineItem.quantity} onInput={onQuantityChange} />
        <button className={styles['quantity-btn']} onClick={onIncreaseQuantity}>
          <AddIcon fontSize="small" sx={{ color: '#dfdfdf' }} />
        </button>
      </div>
    </li>
  );
}
