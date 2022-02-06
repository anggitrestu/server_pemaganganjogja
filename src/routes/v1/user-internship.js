const express = require('express');
const router = express.Router();
const userInternshipHandler = require('../../controllers/user-internship');

router.post('', userInternshipHandler.create);
router.get('/:user_id/', userInternshipHandler.getOne);
router.get('', userInternshipHandler.getAll);

module.exports = router;
