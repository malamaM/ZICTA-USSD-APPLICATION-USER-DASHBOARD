import axios from "axios";

const account = {
  displayName: '', // Initialize displayName with an empty string
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_14.jpg',
};

const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/me');
    const userData = response.data;

    console.log('User Data:', userData);

    const name = userData.user.name; // Set the value of `name` from the response

    account.displayName = name; // Set the value of `displayName` to `name`

    console.log(account);

    // Handle the user data as needed
  } catch (error) {
    console.error('User data fetch error:', error);
    // Handle the error
  }
};

fetchUserData();

export default account;
