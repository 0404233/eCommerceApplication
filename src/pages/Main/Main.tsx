import ResponsiveAppBar from "../../components/layout/header/Header";
import { logoutCustomer } from "../../services/http/logoutCustomer";
import SDKInterface from "../../services/SDK/createClient";

export default function MainPage() {


  const handleLogout = () => {

  };

  return (
    <>
      <ResponsiveAppBar />
      <h1>Main page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>)
}
