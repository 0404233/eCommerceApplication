import { ReactElement, useState } from 'react';
import styles from './add-to-cart.module.css';
import { sdk } from '../../../services/sdk/create-client';
import { getAnonymousCartId } from '../../../utils/set-get-cart-id';
import { getToken } from '../../../services/http/get-token-from-cookie';
import { getUserId } from '../../../utils/set-get-user-id';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';

type AddToCartProps = {
  productId: string;
  disabled: boolean;
};

export default function AddToCart({ productId, disabled }: AddToCartProps): ReactElement {
  const [isDisabled, setIsDisabled] = useState(false);

  const addCurrentProduct = async (cartResponse: ClientResponse<Cart>) => {
    sdk.addProductToCart(cartResponse, productId);
    setIsDisabled(true);
  };

  const setProductToCart = async () => {
    const anonymousCartId = getAnonymousCartId();
    const { refreshToken } = getToken();

    if (refreshToken) {
      const userId = getUserId();
      if (userId) {
        const cartResponse = await sdk.getCustomerCart();
        if (cartResponse) {
          await addCurrentProduct(cartResponse);
        }
      }
    } else if (anonymousCartId) {
      const cartResponse = await sdk.getAnonCart(anonymousCartId);
      if (cartResponse) await addCurrentProduct(cartResponse);
    }
  };

  return (
    <button onClick={setProductToCart} disabled={disabled || isDisabled} className={styles['cart-btn']}>
      Add to Cart 🛒
    </button>
  );
}
