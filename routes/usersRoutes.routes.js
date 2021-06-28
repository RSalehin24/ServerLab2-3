const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {getRegister, postRegister, getLogin, getDashBoard} = require("./../controllers/usersControllers.controllers")

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get("/register", getRegister); 
//router.post("/register", isLoggedIn,postRegister);
//router.get("/login",getLogin);
//router.get("/dashboard", getDashBoard);

module.exports = router; 