const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);

module.exports = router;
