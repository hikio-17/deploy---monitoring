const asyncHandler = require('express-async-handler');
const {
  existingDevice,
  createDevice,
  findAllDevice,
  availabilityDevice,
  findDeviceById,
  deleteDeviceById,
  updateDeviceById,
} = require('../services/deviceService');

const createDeviceHandler = asyncHandler(async (req, res) => {
  const {
    name, regionId, max, price,
  } = req.body;
  await existingDevice(regionId);
  const { id: deviceId } = await createDevice({
    name, regionId, max, price,
  });

  res.status(201).json({
    status: 'success',
    data: {
      deviceId,
    },
  });
});

const getAllDeviceHandler = asyncHandler(async (req, res) => {
  const devices = await findAllDevice();

  res.status(200).json({
    status: 'success',
    data: {
      devices,
    },
  });
});

const getDeviceByIdHandler = asyncHandler(async (req, res) => {
  const { id: deviceId } = req.params;

  await availabilityDevice(deviceId);

  const device = await findDeviceById(deviceId);

  res.status(200).json({
    status: 'success',
    data: {
      device,
    },
  });
});

const updateDeviceByIdHandler = asyncHandler(async (req, res) => {
  const { id: deviceId } = req.params;

  await availabilityDevice(deviceId);
  await updateDeviceById(deviceId, req.body);

  res.status(200).json({
    status: 'success',
    message: `Update device with id '${deviceId}' successfully`,
  });
});

const deleteDeviceByIdHandler = asyncHandler(async (req, res) => {
  const { id: deviceId } = req.params;

  await availabilityDevice(deviceId);
  await deleteDeviceById(deviceId);

  res.status(200).json({
    status: 'success',
    message: `Delete device with id '${deviceId}' successfully`,
  });
});

module.exports = {
  createDeviceHandler,
  getAllDeviceHandler,
  getDeviceByIdHandler,
  updateDeviceByIdHandler,
  deleteDeviceByIdHandler,
};
