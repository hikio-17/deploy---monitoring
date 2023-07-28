const express = require('express');
const { userSignHandler } = require('../controllers/authController');

const router = express.Router();

router.post('/auth', userSignHandler);

module.exports = router;
