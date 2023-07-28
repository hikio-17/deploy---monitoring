const express = require('express');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const { createReportHandler } = require('../controllers/reportController');

const router = express.Router();

router.post('/report', authCheck, adminCheck, createReportHandler);

module.exports = router;
