const express = require('express');

const { upload } = require('../controllers/cloudinaryController');

const router = express.Router();

router.post('/upload/images', upload);

module.exports = router;
