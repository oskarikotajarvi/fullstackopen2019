import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const like = async blog => {
  const url = baseUrl + `/${blog.id}`;
  const config = {
    headers: { Authorization: token }
  };

  blog.likes += 1;

  const res = await axios.put(url, blog, config);
  return res.data;
};

export default { getAll, create, setToken, like };
