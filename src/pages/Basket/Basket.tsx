import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { getAnonymousCartId } from '../../utils/set-get-cart-id';
import { sdk } from '../../services/sdk/create-client';
import styles from './basket.module.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import CartProduct from './CartProduct/CartProduct';
import DeleteProductButton from './DeleteProductButton/DeleteProductButton';
import { PromocodeAlert, RemoveLineItemAction } from '../../types/types';
import { Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/common/loading-spinner/LoadingSpinner';
import { getToken } from '../../services/http/get-token-from-cookie';
import { getUserId } from '../../utils/set-get-user-id';
import PromoAlert from './PromoAlert';

export default function Basket(): ReactElement {
  const [promocodeValue, setPromocodeValue] = useState('');
  const [cart, setCart] = useState<Cart>();
  const [alertMessage, setAlertMessage] = useState<PromocodeAlert>({
    severity: 'success',
    message: '',
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    async function getData(): Promise<void> {
      const anonymousCartId = getAnonymousCartId();
      const { refreshToken } = getToken();

      if (refreshToken) {
        const userId = getUserId();
        if (userId) {
          const cartResponse = await sdk.getCustomerCart();
          if (cartResponse) {
            const currentCart = cartResponse.body;
            console.log(currentCart);
            setCart(currentCart);
          }
        }
      } else if (anonymousCartId) {
        const cartResponse = await sdk.getAnonCart(anonymousCartId);
        if (cartResponse) {
          const currentCart = cartResponse.body;
          console.log(currentCart);
          setCart(currentCart);
        }
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

  const submitPromocode = async (e: FormEvent) => {
    e.preventDefault();
    const promocode = promocodeValue.trim().toUpperCase();
    if (cart && promocode.length > 0) {
      const appliedPromocode = cart.discountCodes.find(({ state }) => state === 'MatchesCart');
      if (appliedPromocode) {
        setAlertMessage({
          severity: 'error',
          message: 'The promo code has already been applied',
        });
        setIsAlertOpen(true);
      } else {
        const discountCart = await sdk.applyDiscountCode(cart.id, cart.version, promocode);
        if (discountCart.discountCodes.find(({ state }) => state === 'MatchesCart')) {
          setAlertMessage({
            severity: 'success',
            message: 'Promo code successfully applied!',
          });
          setIsAlertOpen(true);
        }
        setCart(discountCart);
      }
      setPromocodeValue('');
    }
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
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
              <div className={styles['total-cost-container']}>
                {cart.discountCodes.filter(({ state }) => state === 'MatchesCart').length > 0 ? (
                  <>
                    <span className={styles['total-cost-value']}>
                      {cart.lineItems.reduce(
                        (acc, cur) =>
                          acc + (cur.price.value.centAmount * cur.quantity) / 10 ** cur.price.value.fractionDigits,
                        0,
                      )}
                    </span>
                    <span className={styles['total-cost-discounted']}>
                      {cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits}
                    </span>
                  </>
                ) : (
                  <span className={styles['total-cost-value']}>
                    {cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits}
                  </span>
                )}
              </div>
            </div>
            <form className={styles['cart-order-promocode']} onSubmit={submitPromocode}>
              <input
                placeholder="Enter promocode here"
                type="text"
                className={styles['order-promocode-input']}
                value={promocodeValue}
                onChange={(e) => setPromocodeValue(e.target.value)}
              />
              <button className={styles['order-promocode-btn']}>apply</button>
            </form>
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
      {isAlertOpen && <PromoAlert display={alertMessage} closeAlert={closeAlert} />}
    </div>
  );
}
