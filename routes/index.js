var { resolve } = require('path')
var express = require('express');
var router = express.Router();
var init = require('./init')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(`/init`,
  init.get)

router.get(`/video`,
  init.video)


module.exports = router;
