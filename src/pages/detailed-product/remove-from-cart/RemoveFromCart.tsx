import { ReactElement } from 'react';
import { sdk } from '../../../services/sdk/create-client';
import { getAnonymousCartId } from '../../../utils/set-get-cart-id';
import { getToken } from '../../../services/http/get-token-from-cookie';
import { getUserId } from '../../../utils/set-get-user-id';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './remove-from-cart.module.css';

type RemoveFromCartProps = {
  productId: string;
};

export default function RemoveFromCart({ productId }: RemoveFromCartProps): ReactElement {
  const deleteCurrentCar = async (cartResponse: ClientResponse<Cart>) => {
    const { id, version, lineItems } = cartResponse.body;

    const lineItemId = lineItems.filter((item) => item.productId === productId).map((item) => item.id)[0];

    if (lineItemId) await sdk.deleteProductFromCart(id, version, lineItemId);
  };

  const deleteCar = async () => {
    const anonymousCartId = getAnonymousCartId();
    const { refreshToken } = getToken();

    if (refreshToken) {
      const userId = getUserId();
      if (userId) {
        const cartResponse = await sdk.getCustomerCart();
        if (cartResponse) {
          await deleteCurrentCar(cartResponse);
        }
      }
    } else if (anonymousCartId) {
      const cartResponse = await sdk.getAnonCart(anonymousCartId);
      if (cartResponse) await deleteCurrentCar(cartResponse);
    }
  };

  return (
    <button onClick={deleteCar} className={styles['cart-btn-remove']}>
      Remove from Cart
      <DeleteForeverIcon
        sx={{
          fontSize: '1.35rem',
          cursor: 'pointer',
          transition: 'color 0.2s linear',
          '&:hover': {
            color: 'error.main',
          },
        }}
      />
    </button>
  );
}
