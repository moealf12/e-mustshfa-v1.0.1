const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
// creating a new user 
router.post('/register', (req,res)=>{  
    
    newUser = {
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        email: req.body.email,
        password : req.body.password,
        dob : req.body.dob,
        weight : req.body.weight,
        height : req.body.height,
        nationality : req.body.nationality,
        phoneNumber : req.body.phoneNumber,
        emergencyName : req.body.emergencyName,
        emergencyPhone : req.body.emergencyPhone
    }


    User.findOne({email : req.body.email})
    .then(user =>{
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{ 
                newUser.password = hash
                User.create(newUser)
                .then(user => res.send("user created " + newUser.email))
                .catch(err=> res.send(err))
            })
        }else{
            res.send('email is used')
        }
    }).catch(err => res.send(err))
})
// nouf 
// Login steps (1-login) 
router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email
        })
        .then(user => {            
            if (user) {
                
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    user.password = "" 
                    var paylod = {
                        user
                    }
                    let token = jwt.sign(paylod, 'secret', {
                        expiresIn: 60*60*24*365
                    })
                    res.send(token)
                }
                // if password not the same
                else {
                    res.json({msg :"Password is not currect"})
                }
            } else {
                // if email not exist
                console.log("yess")
                res.json({msg:"email is not found"})
            }
        })
        .catch(err => res.send(err))
})

// change the passwoer 

router.post('/changepassword/:token' , (req , res)=>{
    
// newPassword

    var decoded = jwt.verify(req.params.token, 'secret')
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        var password = hash
        User.findByIdAndUpdate(decoded.user._id , {password:password  }  )
        .then(user => res.send({msg :`the password has change `  , user :user}))
        .catch(err => res.send(err))
    })
 

})



module.exports = router
