var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'PemaganganJogja',
    port: process.env.PORT || '3030',
  });
  w;
});

module.exports = router;
