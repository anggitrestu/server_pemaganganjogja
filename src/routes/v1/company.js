const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const companyHandler = require('../../controllers/company');

router.post('', verifyToken, companyHandler.create);
router.get('/:id', companyHandler.getOne);
router.get('', companyHandler.getAll);
router.get('/my/admin', verifyToken, companyHandler.getByAdmin);
router.get(
  '/my/admin/:internship_id',
  verifyToken,
  companyHandler.getApplicantInternshipByAdmin
);
router.put('/:id', verifyToken, companyHandler.update);
router.delete('/:id', verifyToken, companyHandler.destroy);
router.patch('/name', companyHandler.getName);

module.exports = router;
