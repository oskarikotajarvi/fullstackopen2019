import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token }
  };
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
  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  await user.blogs.push(res.data.id.toString());
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
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

const remove = async id => {
  const url = `${baseUrl}/${id}`;
  const res = await axios.delete(url, config);
  return res.data;
};

export default { getAll, create, setToken, like, remove };
