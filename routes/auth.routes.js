const controller = require("../controller/auth.controller");
const express = require('express');
const router = express.Router();
router.post('/signin', controller.signin);

router.post('/signup', controller.signup);

module.exports = router;