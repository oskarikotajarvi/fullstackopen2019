import axios from 'axios';

const baseURL = '/api/users';

const fetchUsers = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export default { fetchUsers };
