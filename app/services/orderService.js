const { nanoid } = require('nanoid');
const { Order, Device } = require('../models');
const InvariantError = require('../exeptions/InvariantError');

const createOrder = async (userId, { waterOrder, deviceId }) => {
  const id = `order-${nanoid()}`;

  const device = await Device.findOne({ where: { id: deviceId } });

  if (device.max < waterOrder) {
    throw new InvariantError('Mohon maaf air masih belum tersedia');
  }

  device.set({
    max: device.max - waterOrder,
  });

  await device.save();

  const order = {
    id, waterOrder, userId, deviceId,
  };

  const newOrder = await Order.create(order);

  return newOrder;
};

const userWaterUsage = async (userId) => {
  const orders = await Order.findAll({ where: { userId } });

  const waterUsage = orders.reduce((acc, curr) => acc + curr.waterOrder, 0);

  return waterUsage;
};

module.exports = {
  createOrder,
  userWaterUsage,
};
