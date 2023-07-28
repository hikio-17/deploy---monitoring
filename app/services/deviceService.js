const { nanoid } = require('nanoid');
const { Device } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');

const createDevice = async ({
  name, max, price, regionId,
}) => {
  const id = `device-${nanoid()}`;

  const device = {
    id, name: name.toLowerCase(), max, price, regionId,
  };

  const newDevice = await Device.create(device);

  return newDevice;
};

const existingDevice = async (regionId) => {
  const device = await Device.findOne({ where: { regionId } });

  if (device) {
    throw new InvariantError(`Device untuk region dengan id '${regionId}' sudah ada.`);
  }

  return true;
};

const findAllDevice = async () => {
  const devices = await Device.findAll();

  return devices;
};

const availabilityDevice = async (deviceId) => {
  const device = await Device.findOne({ where: { id: deviceId } });

  if (!device) {
    throw new NotFoundError(`Device dengan id '${deviceId}' tidak ditemukan`);
  }

  return true;
};

const findDeviceById = async (deviceId) => {
  const device = await Device.findOne({ where: { id: deviceId } });

  return device;
};

const updateDeviceById = async (deviceId, {
  name = '', max = null, price = null, regionId = '',
}) => {
  const device = await Device.findOne({ where: { id: deviceId } });

  device.set({
    name: name || device.name,
    max: max || device.max,
    price: price || device.price,
    regionId: regionId || device.regionId,
  });

  await device.save();
};

const deleteDeviceById = async (deviceId) => {
  await Device.destroy({ where: { id: deviceId } });
};

module.exports = {
  createDevice,
  findAllDevice,
  findDeviceById,
  updateDeviceById,
  deleteDeviceById,
  availabilityDevice,
  existingDevice,
};
