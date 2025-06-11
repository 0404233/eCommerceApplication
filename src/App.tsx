import { ReactElement, useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { sdk } from './services/sdk/create-client';
import { userData } from './utils/user-data';
import LoadingSpinner from './components/common/loading-spinner/LoadingSpinner';
import { getToken } from './services/http/get-token-from-cookie';
import { getAnonymousId, setAnonymousId } from './utils/set-get-anonymous-id';
import { setAnonymousCartId } from './utils/set-get-cart-id';

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(userData.getUserLogin());
  const changeLoginStatus = (status: boolean) => {
    userData.setUserLogin(status);
    setLoginStatus(status);
  };
  useEffect(() => {
    const { accessToken } = getToken();
    const anonymousId = getAnonymousId();

    if (accessToken) {
      sdk.refreshApiRoot();
      sdk.apiRoot
        .me()
        .get()
        .execute()
        .then((res) => {
          if (res.statusCode === 200) {
            changeLoginStatus(true);
          } else {
            changeLoginStatus(false);
          }
          setIsLoading(false);
        });
    } else if (anonymousId) {
      setIsLoading(false);
    } else {
      sdk.apiRoot
        .me()
        .carts()
        .post({ body: { currency: 'USD', country: 'US' } })
        .execute()
        .then((cart) => {
          if (cart.body.anonymousId) {
            setAnonymousId(cart.body.anonymousId);
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
