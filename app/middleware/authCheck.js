const asynchandler = require('express-async-handler');
const AuthenticationError = require('../exeptions/AuthenticationError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const { verifyAccessToken, decodePayload } = require('../tokenize/TokenManager');
const { User } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');

exports.authCheck = asynchandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError('Akses token diperlukan');
  }
  await verifyAccessToken(token);
  const decode = await decodePayload(token);

  if (!decode) {
    throw new AuthenticationError('Token yang anda berikan tidak valid.');
  }

  const user = await User.findOne({
    where: {
      id: decode.id,
    },
  }, {
    attributes: {
      exclude: ['password '],
    },
  });

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  req.user = user;
  next();
});

exports.adminCheck = asynchandler(async (req, res, next) => {
  if (req.user.role !== 'ADMIN_UTAMA') {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }

  next();
});
