import { ReactElement, useEffect, useState } from 'react';
import { getAnonymousCartId } from '../../utils/set-get-cart-id';
import { sdk } from '../../services/sdk/create-client';
import styles from './basket.module.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import CartProduct from './CartProduct/CartProduct';
import DeleteProductButton from './DeleteProductButton/DeleteProductButton';
import { RemoveLineItemAction } from '../../types/types';
import { Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/common/loading-spinner/LoadingSpinner';

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
    if (cart) {
      const updatedCart = await sdk.updateLineItemQuantity(cart.id, cart.version, lineItemId, quantity);
      setCart(updatedCart);
    }
  };

  const deleteLineItems = async () => {
    if (cart) {
      const actions: RemoveLineItemAction[] = cart.lineItems.map((el) => ({
        action: 'removeLineItem',
        lineItemId: el.id,
      }));
      const emptyCart = await sdk.clearCart(cart.version, cart.id, actions);
      setCart(emptyCart);
    }
  };

  return (
    <div className={styles['basket-page']}>
      {!cart ? (
        <LoadingSpinner />
      ) : cart.lineItems.length > 0 ? (
        <>
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
                <span className={styles['total-cost']}>
                  {cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits}
                </span>
              </div>
            </div>
            <DeleteProductButton callback={() => deleteLineItems()} textContent="Clear Shopping Cart" fullWidth />
          </div>
        </>
      ) : (
        <div className={styles['empty-basket']}>
          <h3>The basket is empty</h3>
          <p>Select the products you need in the catalog</p>
          <Link to="/catalog">
            <Button variant="outlined" endIcon={<ArrowOutwardIcon fontSize="large" />}>
              Go to the Сatalog
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
