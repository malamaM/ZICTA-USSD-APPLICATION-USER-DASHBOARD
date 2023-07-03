import axios from 'axios';

const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/applications');
    const userData = response.data;

    console.log('User Data:', userData);

    // Map the user data to the desired format
    /* const users = userData.map((user) => ({
      id: user.id,
      avatarUrl: `/assets/images/avatars/avatar_${user.id}.jpg`,
      name: user.customer_name,
      company: user.organization_name,
      isVerified: user.opened === "1" ? "Yes" : "No",
      //status: user.status === "pending" ? "Awaiting Action" : user.status,
      role: user.Purpose,
    })); */

    console.log('Populated Users:', users);

    return users;
  } catch (error) {
    console.error('User data fetch error:', error);
    // Handle the error
    return [];
  }
};

export default fetchUserData;
