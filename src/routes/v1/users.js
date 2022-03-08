const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const userHandler = require('../../controllers/user');

/* GET users listing. */
router.get('', verifyToken, userHandler.getAll);
router.get('/:id', verifyToken, userHandler.getOne);

module.exports = router;
