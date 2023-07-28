const express = require('express');
const { authCheck } = require('../middleware/authCheck');
const { createOrdersHandler, userWaterUsagehandler } = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', authCheck, createOrdersHandler);
router.get('/water-usage', authCheck, userWaterUsagehandler);

module.exports = router;
