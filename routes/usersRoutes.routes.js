const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {getRegister, postRegister, getLogin, postLogin, getDashboard} = require("./../controllers/usersControllers.controllers")

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get("/register", getRegister); 
router.post("/register", postRegister);
router.get("/login",getLogin);
router.post("/login", postLogin);
router.get("/dashboard", getDashboard);


module.exports = router; 