var express = require('express');
var router = express.Router();

/* GET page2 page. */
router.get('/page2', function(req, res) {
  res.render('page2');
});

module.exports = router;

