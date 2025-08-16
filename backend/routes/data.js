const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { verifyToken } = require('../controllers/authController');

router.get('/health', verifyToken, dataController.getHealthData);

module.exports = router;
