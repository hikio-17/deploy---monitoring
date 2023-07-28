const bcrypt = require('bcryptjs');
const { User } = require('../models');
const AuthenticationError = require('../exeptions/AuthenticationError');

const userSign = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AuthenticationError('Kredensial yang anda masukkan tidak valid.');
  }

  const passwrodIsValid = await bcrypt.compare(password, user.password);

  if (!passwrodIsValid) {
    throw new AuthenticationError('Kredensial yang anda masukkan tidak valid.');
  }

  return user;
};

module.exports = {
  userSign,
};
