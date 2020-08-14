const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../model/user");

const {
    register_user,
    login_user,
    current_user,
    all_user
} = require("../controller/user");

const checkAuth = passport.authenticate("jwt", {session : false});


//회원가입기능

//@route POST http://localhost:5000/user/register
//@desc Register user
//@access PUBLIC
router.post("/register", register_user);



//로그인

//@route POST http://localhost:5000/user/login
//@desc Login user
//@access PUBLIC

router.post("/login", login_user);



//현재 유저 정보

//@route GET http://localhost:5000/user/current
//@desc Cureent userinfo
//@access PRIVATE

router.get("/current", checkAuth, current_user);

//모든 유저 정보

//@route GET http://localhost:5000/user/all
//@desc Get all users
//@access PRIVATE(Only admin)

router.get("/all", checkAuth, all_user);






module.exports = router;