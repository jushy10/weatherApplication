
const express = require('express'),
router = express.Router(),

hello = require("../controllers/hello.js");

router.get('/', hello.hello);


module.exports = router;