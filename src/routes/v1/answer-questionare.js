const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const answerSurveyHandler = require('../../controllers/answer-quisionare');

router.post('', verifyToken, answerSurveyHandler.create);

module.exports = router;
