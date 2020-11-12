import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async content => {
  const object = { content, votes: 0 };
  const res = await axios.post(baseUrl, object);
  return res.data;
};

const voteAnecdote = async anecdote => {
  const res = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote);
  return res.data;
};

export default { getAll, createNew, voteAnecdote };
