const API_URL = import.meta.env['VITE_API_URL'];
const PROJECT_KEY = import.meta.env['VITE_PROJECT_KEY'];
const AUTH_URL = import.meta.env['VITE_AUTH_URL'];

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

// export default async function createCustomer(token: string, userData: UserData) {

//   const params = new URLSearchParams({
//   grant_type: 'client_credentials',

// });

// // const response = await fetch(`${API_URL}/${PROJECT_KEY}/customers/token`, {
// const response = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     ...userData
//   }),
// });

// const data = await response.json();
// console.log(data);

// return data;
// }


const CLIENT_SECRET = import.meta.env['VITE_CLIENT_SECRET'];
const CLIENT_ID = import.meta.env['VITE_CLIENT_ID'];


export default async function createCustomer(token: string, userData: UserData) {
  const response = await fetch(`${AUTH_URL}/${PROJECT_KEY}/customers`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...userData
    })
  });

  const data = await response.json();
  console.log("Created Customer:", data);
  getAccessToken(userData);
  
  return data;
}


async function getAccessToken(userData: UserData) {
  const response = await fetch(`${AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: userData.email,
      password: userData.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  });

  const data = await response.json();
  console.log("Access Token:", data.access_token);
}
