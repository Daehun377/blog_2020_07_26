const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const userModel = require("../model/user");


//회원가입기능

//@route POST http://localhost:5000/user/register
//@desc Register user
//@access PUBLIC
router.post("/register", (req, res) => {

    // 이메일 유무체크 -> 패스워드 암호화 -> 데이터베이스 저장

    const {name, email, password } = req.body;

    userModel
        .findOne({email})
        .then(email => {
            if(email){
                return res.json({
                    message : "email already exists"
                });
            }
            else{


                const newUser = new userModel({
                    name, email, password
                });

                newUser
                    .save()
                    .then(user => {
                        console.log(user);

                        res.json({
                            id : user._id,
                            name : user.name,
                            email : user.email,
                            password : user.password,
                            avatar : user.avatar,
                            date : {
                                createdDate : user.createdAt,
                                updatedDate : user.updatedAt
                            }
                        })
                    })
                    .catch(err => {
                        res.json({
                            error : err.message
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
})







//로그인

//@route POST http://localhost:5000/user/login
//@desc Login user
//@access PUBLIC

router.post("/login", (req, res) => {


})






//현재 유저 정보

//@route GET http://localhost:5000/user/current
//@desc Cureent userinfo
//@access PRIVATE

router.get("/current", (req, res) => {



});

module.exports = router;