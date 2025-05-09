import { ReactElement } from 'react';
import './App.css';
import AppRoutes from './routes/Routes';


// const AUTH_URL = import.meta.env['VITE_AUTH_URL'];
// const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
// const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];
// const SCOPES = import.meta.env['VITE_SCOPES'];

// type AuthResponse = {
//   access_token: string;
//   expires_in: number;
//   scope: string;
//   token_type: string;
// };

function App(): ReactElement {
  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');
  // const [authKey, setAuthKey] = useState('');
  // const onSubmit = (e: FormEvent) => {
  //   console.log(authKey);
  //   e.preventDefault();
  //   console.log(login, password);
  // };
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
  //     setAuthKey(data.access_token);
  //   }
  //   getToken();
  // }, []);
  return (
    // <div className="wrapper">
    //   <form onSubmit={onSubmit}>
    //     <label htmlFor="login">Login</label>
    //     <input
    //       type="text"
    //       name=""
    //       id="login"
    //       value={login}
    //       onChange={(e) => setLogin(e.target.value)}
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="text"
    //       name=""
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">submit</button>
    //   </form>
    // </div>
    <AppRoutes />
  );
}

export default App;
