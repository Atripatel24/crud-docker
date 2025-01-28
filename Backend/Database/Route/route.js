const express = require('express');
const router = express.Router();

let usercontroller = require('./api')
router.use(usercontroller)

module.exports = router