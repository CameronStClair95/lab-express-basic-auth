const router = require('express').Router()

const User = require('../models/User.model')

const bcrypt = require('bcryptjs')

const saltRounds = 10

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

router.get('/profile',(req,res)=>{
    res.render('user/user-profile')
})

module.exports = router
