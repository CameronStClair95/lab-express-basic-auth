const router = require('express').Router()

const User = require('../models/User.model')

const bcrypt = require('bcryptjs')

const saltRounds = 10

const mongoose = require('mongoose')

const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard.js');

router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    bcrypt
    .genSalt(saltRounds)
    .then((salt)=>{
    console.log("Salt: ",salt)
    return bcrypt.hash(password,salt)
    })
    .then(hashedPassword=>{
        console.log("Hashed Password: ", hashedPassword)
        User.create({
        username:username,
        passwordHash:hashedPassword
        })
        res.redirect('/profile')
    })
.catch(error=>{
       console.log(error)
    })
})

router.get('login', isLoggedIn, (req,res) => {
    console.log(req.session)
    res.render('auth/login')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/user-profile', {userInfo: req.session.currentUser})
})

router.post('/login', (req,res) => {
    console.log("session =====> ", req.session)
    console.log(req.body)
    const {username, password} = req.body;

    if (!email || !password) {
        res.render('auth/login' , {errorMessage:'Please enter an email or password'})
        return
    }
    User.findOne({username})
    .then(user => {
        console.log(user)
        if(!user){
            res.render('auth/login', {errorMessage: "User not found please sign up. No account associated with username"})
        } 
        else if (bcrypt.compareSync(password,user.passwordHash)) {
            req.session.currentUser = user
            res.redirect('profile')
        }
        else {
            res.render('auth/login', {errorMessage: "Incorrect Password"})
        }

    })
    .catch(error =>{
        console.log(error)
    })
})

// router.get('/profile',(req,res)=>{
// res.render('user/user-profile')
// })

module.exports = router
