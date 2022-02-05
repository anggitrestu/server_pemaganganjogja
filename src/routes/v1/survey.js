const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const surveyHandler = require('../../controllers/survey');

router.post('', verifyToken, surveyHandler.create);
router.get('', surveyHandler.getAll);

module.exports = router;
