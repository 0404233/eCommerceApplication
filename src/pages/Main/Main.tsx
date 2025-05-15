import { logoutCustomer } from "../../services/http/logoutCustomer";
import { getTokenFromCookie } from "../../services/http/getTokenFromCookie";

export default function MainPage() {

  const handleLogout = () => {
    const token = getTokenFromCookie();

    if (token) {
      logoutCustomer(token, 'access_token')
    }

  };

  return (
    <>
      <h1>Main page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>)
}
