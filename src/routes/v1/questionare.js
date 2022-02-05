const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const questionareHandler = require('../../controllers/quisionare');

router.post('', verifyToken, questionareHandler.create);
router.get('', questionareHandler.getAll);

module.exports = router;
