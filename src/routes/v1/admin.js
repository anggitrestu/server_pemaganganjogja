const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const adminHandler = require('../../controllers/admin');

router.post('/login', adminHandler.login);
router.post('/register', adminHandler.register);
router.get('', verifyToken, adminHandler.get);

module.exports = router;
