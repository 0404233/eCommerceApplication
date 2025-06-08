import { ReactElement, useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { sdk } from './services/sdk/create-client';
import { userData } from './utils/user-data';
import LoadingSpinner from './components/common/loading-spinner/LoadingSpinner';
import { getToken } from './services/http/get-token-from-cookie';

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(userData.getUserLogin());
  const changeLoginStatus = (status: boolean) => {
    userData.setUserLogin(status);
    setLoginStatus(status);
  };
  useEffect(() => {
    const { accessToken } = getToken();
    if (accessToken) {
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
    } else {
      const cart = sdk.apiRoot
        .me()
        .carts()
        .post({ body: { currency: 'USD' } })
        .execute();

      cart.then(() => setIsLoading(false));
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
