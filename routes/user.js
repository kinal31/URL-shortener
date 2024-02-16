const express = require ("express");
const { handleUserSignUp } = require("../controller/user");
const {handleUserLogin} = require("../controller/user")
const router = express.Router();

router.post("/",handleUserSignUp);

router.post("/login",handleUserLogin);

module.exports = router;