const express = require('express');
const router = express.Router();
const userQuestionareHandler = require('../../controllers/user-questionare');

router.post('', userQuestionareHandler.create);
router.get('/:user_id', userQuestionareHandler.getByUserID);

module.exports = router;
