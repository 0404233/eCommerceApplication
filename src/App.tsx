import {
  ReactElement,
  useEffect,
} from 'react';
import './App.css';
import AppRoutes from './routes/Routes';

function App(): ReactElement {
  // useEffect(() => {
  //   async function getToken(): Promise<void> {
  //     const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  //     const params = new URLSearchParams({
  //       grant_type: 'client_credentials',
  //       scope: SCOPES,
  //     });
  //     const response = await fetch(`${AUTH_URL}/oauth/token`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: `Basic ${credentials}`,
  //       },
  //       body: params.toString(),
  //     });
  //     const data: AuthResponse = await response.json();
  //     console.log(data);
  //   }
  //   getToken();
  // }, []);
  useEffect(() => {
    const controller =
      new AbortController();

    return () => controller.abort();
  }, []);
  return <AppRoutes />;
}

export default App;
