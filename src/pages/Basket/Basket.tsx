import { ReactElement, useEffect, useState } from 'react';
import { getAnonymousCartId } from '../../utils/set-get-cart-id';
import { sdk } from '../../services/sdk/create-client';
import styles from './basket.module.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import CartProduct from './CartProduct/CartProduct';

export default function Basket(): ReactElement {
  const [cart, setCart] = useState<Cart>();
  useEffect(() => {
    async function getData(): Promise<void> {
      const cartId = getAnonymousCartId();
      if (cartId) {
        const cart = await sdk.getCart(cartId);
        console.log(cart);
        setCart(cart);
      }
    }
    getData();
  }, []);

  const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
    const cartId = getAnonymousCartId();
    if (cartId && cart) {
      const updatedCart = await sdk.updateLineItemQuantity(cartId, cart.version, lineItemId, quantity);
      setCart(updatedCart);
    }
  };

  return (
    <div className={styles['basket-page']}>
      {cart && (
        <div className={styles['basket-page-container']}>
          <ul className={styles['cart-products-list']}>
            {cart.lineItems.map((el: LineItem) => (
              <CartProduct key={el.id} lineItem={el} updateLineItemQuantity={updateLineItemQuantity} />
            ))}
          </ul>
          <div className={styles['cart-order-info']}>
            <div className={styles['order-info-header']}>
              <div>
                <span className={styles['total-cost']}>Total cost</span>
              </div>
              <div>
                <span className={styles['total-cost']}>{cart.totalPrice.centAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
