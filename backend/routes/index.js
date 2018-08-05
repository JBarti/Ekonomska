var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/test', (req, res, next) => {
  res.send('Works')
})

module.exports = router
