import { ReactElement, useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { sdk } from './services/sdk/create-client';
import { userData } from './utils/user-data';
import LoadingSpinner from './components/common/loading-spinner/LoadingSpinner';
import { getToken } from './services/http/get-token-from-cookie';
import { getAnonymousCartId, setAnonymousCartId } from './utils/set-get-cart-id';

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(userData.getUserLogin());
  const changeLoginStatus = (status: boolean) => {
    userData.setUserLogin(status);
    setLoginStatus(status);
  };
  useEffect(() => {
    const { refreshToken } = getToken();
    const anonymousCartId = getAnonymousCartId();

    if (refreshToken) {
      sdk.refreshApiRoot();
      sdk
        .getCustomerInfo()
        .then((res) => {
          if (res.statusCode === 200) {
            changeLoginStatus(true);
          } else {
            changeLoginStatus(false);
          }
        })
        .finally(() => setIsLoading(false));
    } else if (anonymousCartId) {
      setIsLoading(false);
    } else {
      sdk
        .createNewCart()
        .then((cart) => {
          if (cart.body.id) {
            setAnonymousCartId(cart.body.id);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <AppRoutes loginStatus={loginStatus} changeLoginStatus={changeLoginStatus} />}
    </>
  );
}

export default App;
