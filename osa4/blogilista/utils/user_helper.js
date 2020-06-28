const User = require('../models/user');

const initialUser = {
  username: 'initialUser',
  name: 'Initial User',
  passwordHash: 'hashedpass'
};

const validUser = {
  username: 'validUser',
  name: 'Valid User',
  password: 'validPass'
};

const nameTooShort = {
  username: 'in',
  name: 'Name Short',
  password: 'sekretstuff'
};

const usernameAlreadyInDb = {
  username: 'initialUser',
  name: 'NotUnique Name',
  password: 'sekretstuff'
};

const passwordTooShort = {
  username: 'pssTooShort',
  name: 'PassToo Short',
  password: 'aa'
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialUser,
  nameTooShort,
  usernameAlreadyInDb,
  passwordTooShort,
  validUser,
  usersInDb
};
