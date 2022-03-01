const express = require('express');
const router = express.Router();
// const verifyToken = require('../../middlewares/verifyToken');
const authHandler = require('../../controllers/api-gateway/users');
const userHandler = require('../../controllers/user');

router.post('/register', authHandler.register);
router.post('/update', userHandler.updateProfile);

module.exports = router;
