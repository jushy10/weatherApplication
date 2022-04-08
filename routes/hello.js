
const express = require('express'),
router = express.Router(),

current = require("../controllers/getCurrent.js");

router.get('/', current.testJSON);


module.exports = router;