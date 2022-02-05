const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const regulationHandler = require('../../controllers/regulation');

router.post('', verifyToken, regulationHandler.create);
router.put('/:id', verifyToken, regulationHandler.update);
router.delete('/:id', verifyToken, regulationHandler.destroy);

module.exports = router;
