import { ReactElement, useState } from 'react';
import styles from './add-to-cart.module.css';
import { sdk } from '../../../services/sdk/create-client';
import { getAnonymousCartId } from '../../../utils/set-get-cart-id';

type CarId = {
  productId: string;
  disabled: boolean;
};

export default function AddToCart({ productId, disabled }: CarId): ReactElement {
  const [isDisabled, setIsisabled] = useState(false);

  const setItemToCart = async () => {
    const cartId = getAnonymousCartId();

    if (cartId) {
      const cartResponse = await sdk.apiRoot.carts().withId({ ID: cartId }).get().execute();

      const { id, version } = cartResponse.body;
      await sdk.apiRoot
        .carts()
        .withId({ ID: id })
        .post({
          body: {
            version: version,
            actions: [{ action: 'addLineItem', productId: productId }],
          },
        })
        .execute();
    }
    setIsisabled(true);
  };

  return (
    <button onClick={setItemToCart} disabled={disabled || isDisabled} className={styles['cart-btn']}>
      Add to Cart 🛒
    </button>
  );
}
