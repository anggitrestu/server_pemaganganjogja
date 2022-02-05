const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const internshipHandler = require('../../controllers/internship');

router.post('', verifyToken, internshipHandler.create);
router.get('/:id', internshipHandler.getOne);
router.get('', internshipHandler.getAll);
router.put('/:id', verifyToken, internshipHandler.update);
router.delete('/:id', verifyToken, internshipHandler.destroy);

module.exports = router;
