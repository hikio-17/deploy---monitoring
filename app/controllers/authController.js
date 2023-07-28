const asyncHandler = require('express-async-handler');
const { userSign } = require('../services/authService');
const { createAccessToken } = require('../tokenize/TokenManager');

const userSignHandler = asyncHandler(async (req, res) => {
  const { id } = await userSign(req.body);
  const accessToken = await createAccessToken(id);

  res.status(200).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

module.exports = {
  userSignHandler,
};
