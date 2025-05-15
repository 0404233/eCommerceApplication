import { useNavigate } from "react-router";
import { logoutCustomer } from "../../services/http/logoutCustomer";
import { getTokenFromCookie } from "../../services/http/getTokenFromCookie";


export default function MainPage() {

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = getTokenFromCookie();

    if (token) {
      logoutCustomer(token, 'access_token')
      navigate('/login')
    }

  };


  return (
    <>
      <h1>Main page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>)
}
