const express = require('express');
const router = express.Router();
const userSurveyHandler = require('../../controllers/user-survey');

router.post('', userSurveyHandler.create);
router.get('/:user_id', userSurveyHandler.getByUserID);

module.exports = router;
