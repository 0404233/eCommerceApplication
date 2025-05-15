import getCustomerToken from "./getCustomerToken";

const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];
const API_URL = import.meta.env['VITE_API_URL'];

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default async function signUpCustomer(token: string, userData: UserData) {
  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/customers`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...userData
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log("Created Customer:", data);

    getCustomerToken(userData.email, userData.password)
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}



