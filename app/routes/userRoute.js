const express = require('express');
const {
  userRegisterHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateRoleUserHandler,
  updateProfileUserHandler,
} = require('../controllers/userController');
const { adminCheck, authCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/users', getAllUsersHandler);
router.get('/users/:id', authCheck, getUserByIdHandler);
router.put('/users/roles/:id', authCheck, adminCheck, updateRoleUserHandler);
router.put('/users/profiles/:id', authCheck, updateProfileUserHandler);
router.post('/users', userRegisterHandler);

module.exports = router;
