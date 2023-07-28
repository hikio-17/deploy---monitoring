const asyncHandler = require('express-async-handler');
const {
  createUser,
  findAllUsers,
  verifyAccessUser,
  findUserById,
  userAvailability,
  updateRole,
  updateProfileUser,
} = require('../services/userService');

const userRegisterHandler = asyncHandler(async (req, res) => {
  const { id: userId } = await createUser(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      userId,
    },
  });
});

const getAllUsersHandler = asyncHandler(async (req, res) => {
  const users = await findAllUsers();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUserByIdHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  await userAvailability(userId);
  await verifyAccessUser(req.user, userId);

  const user = await findUserById(userId);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const updateRoleUserHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { role } = req.body;

  await updateRole(userId, role);

  res.status(200).json({
    status: 'success',
    message: `Update user role with id '${userId}' successfully`,
  });
});

const updateProfileUserHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  await userAvailability(userId);
  await verifyAccessUser(req.user, userId);
  await updateProfileUser(userId, req.body);

  res.status(200).json({
    status: 'success',
    message: `Update user profile with id '${userId}'`,
  });
});

module.exports = {
  userRegisterHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateRoleUserHandler,
  updateProfileUserHandler,
};
