import getAppToken from "./getAppToken";

const API_URL = import.meta.env['VITE_API_URL'];
const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];

export default function loginCustomer() {
  const tokenApp = getAppToken();

  fetch(`${API_URL}/${PROJECT_KEY}/stores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenApp}`
    }
  })
    .then((response) => response.json())
    .then((data) => console.log('Success:', data))
}