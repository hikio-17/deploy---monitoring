/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { User, Region } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const AuthenticationError = require('../exeptions/AuthenticationError');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

const createUser = async ({
  fullname, email, password, regionId,
}) => {
  const id = `user-${nanoid()}`;
  const user = await findUserByEmail(email);

  if (user) {
    throw new NotFoundError('Email sudah digunakan');
  }

  const newUser = await User.create({
    id, fullname, email, password, regionId,
  });

  return newUser;
};

const userAvailability = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundError(`Tidak dapat menemukan user dengan id '${userId}'`);
  }

  return true;
};

const findAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'fullname', 'email', 'role', 'regionId'],
    order: [
      ['fullname', 'ASC'],
    ],
  });
  return users;
};

const verifyAccessUser = async (userAccess, userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (user.id !== userAccess.id && userAccess.role !== 'ADMIN_UTAMA') {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini.');
  }

  return true;
};

const findUserById = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ['password', 'regionId'],
    },
    include: [
      {
        model: Region,
      },
    ],
  });

  return user;
};

const updateRole = async (userId, role) => await User.update({ role }, { where: { id: userId } });

const updateProfileUser = async (userId, {
  username = '',
  email = '',
  password = '',
  oldPassword = '',
  age = null,
  isMarried = false,
  gender = '',
  imageProfile = '',
  regionId = '',
}) => {
  const user = await User.findOne({ where: { id: userId } });

  if (oldPassword && password !== '') {
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (isValidPassword) {
      throw new AuthenticationError('Kredensial yang anda masukkan tidak sesuai.');
    }
  }

  user.set({
    username: username || user.username,
    email: email || user.email,
    password: await bcrypt.hashSync(password, 10),
    umur: age || user.age,
    isMarried: isMarried || user.isMarried,
    gender: gender || user.gender,
    imageProfile: imageProfile || user.imageProfile,
    regionId: regionId || user.regionId,
  });

  await user.save();
};

module.exports = {
  createUser,
  findUserByEmail,
  findAllUsers,
  findUserById,
  verifyAccessUser,
  userAvailability,
  updateRole,
  updateProfileUser,
};
