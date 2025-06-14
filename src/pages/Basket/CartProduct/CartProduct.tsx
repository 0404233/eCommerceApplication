import { ChangeEvent, JSX, useState } from 'react';
import styles from './cart-product.module.css';
import type { LineItem } from '@commercetools/platform-sdk';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
  lineItem: LineItem;
  updateLineItemQuantity: (lineItemId: string, quantity: number) => void;
};

export default function CartProduct({ lineItem, updateLineItemQuantity }: Props): JSX.Element {
  const [quantity, setQuantity] = useState<number>(lineItem.quantity);

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const newQuantity = Number(e.target.value);
      setQuantity((prev) => (newQuantity > 0 ? newQuantity : prev));
      updateLineItemQuantity(lineItem.id, quantity);
    }
  };

  const onReduceQuantity = () => {
    setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : prev));
    updateLineItemQuantity(lineItem.id, quantity);
  };

  const onIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    updateLineItemQuantity(lineItem.id, quantity);
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
        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => updateLineItemQuantity(lineItem.id, 0)}
          sx={{
            alignSelf: 'flex-start',
            padding: '3px 12px',
            fontSize: '12px',
            marginTop: 'auto',
            color: '#959595',
            borderColor: '#6a6a6a',
            '&:hover': {
              color: '#b0b0b0',
              borderColor: '#7e7e7e',
              backgroundColor: 'rgba(106, 106, 106, 0.08)',
            },
            '& .MuiButton-startIcon': {
              color: 'inherit',
            },
          }}
        >
          remove
        </Button>
      </div>
      <p className={styles['price-container']}>
        <span className={styles['active-price']}>
          ${lineItem.price.discounted?.value.centAmount ?? lineItem.price.value.centAmount}
        </span>
        {lineItem.price.discounted && <span className={styles['full-price']}>${lineItem.price.value.centAmount}</span>}
      </p>
      <div className={styles['product-quantity']}>
        <button className={styles['quantity-btn']} onClick={onReduceQuantity}>
          <RemoveIcon fontSize="small" sx={{ color: '#dfdfdf' }} />
        </button>
        <input className={styles['quality-input']} type="number" value={quantity} onChange={onQuantityChange} />
        <button className={styles['quantity-btn']} onClick={onIncreaseQuantity}>
          <AddIcon fontSize="small" sx={{ color: '#dfdfdf' }} />
        </button>
      </div>
    </li>
  );
}
