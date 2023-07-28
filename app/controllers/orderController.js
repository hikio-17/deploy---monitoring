/* eslint-disable no-undef */
const asyncHandler = require('express-async-handler');
const { createOrder, userWaterUsage } = require('../services/orderService');

const createOrdersHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { id: orderId } = await createOrder(userId, req.body);

  res.status(200).json({
    status: 'success',
    message: `Orderan anda berhasil di buat dengan id '${orderId}'`,
  });
});

const userWaterUsagehandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const waterUsage = await userWaterUsage(userId);

  res.status(200).json({
    status: 'success',
    data: {
      waterUsage,
    },
  });
});

module.exports = {
  createOrdersHandler,
  userWaterUsagehandler,
};
