const express = require('express');
const router = express.Router();
// const verifyToken = require('../../middlewares/verifyToken');
const excelHandler = require('../../controllers/excel');
const upload = require('../../middlewares/upload');

router.put('/update_users', upload.single('file'), excelHandler.update_users);

module.exports = router;
