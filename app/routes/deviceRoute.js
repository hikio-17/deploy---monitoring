const express = require('express');
const {
  createDeviceHandler,
  getAllDeviceHandler,
  getDeviceByIdHandler,
  updateDeviceByIdHandler,
  deleteDeviceByIdHandler,
} = require('../controllers/deviceController');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/devices', getAllDeviceHandler);
router.get('/devices/:id', getDeviceByIdHandler);
router.put('/devices/:id', authCheck, adminCheck, updateDeviceByIdHandler);
router.delete('/devices/:id', authCheck, adminCheck, deleteDeviceByIdHandler);
router.post('/devices', authCheck, adminCheck, createDeviceHandler);

module.exports = router;
