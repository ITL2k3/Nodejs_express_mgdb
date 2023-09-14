const express = require('express')
const createError = require('http-errors')
const route = express.Router()

const User = require('../models/user.model')
const {userValidate} = require('../helpers/validation')
route.post('/register', async (req,res,next) => {
    try{
        const {email, password} = req.body
        const {error} = userValidate(req.body)
        console.log(`error validation:`,error)
        if(error){
            throw createError(error.details[0].message)
        }
        // if(!email, !password){
        //     throw createError.BadRequest()
        // }
        
        const isExits = await User.findOne({
            email: email
        })
        if(isExits){
            throw createError.Conflict(`${email} is already been registered`)
        }
        const user = new User ({
            email,
            password
        })
        const savedUser = await  user.save()
        return res.json({
            status: 'okay',
            elements: savedUser
        })
    }catch(error){
        next (error)
    }
})
route.post('/refresh-token',(req,res,next) => {
    res.send('function refresh-token')
})
route.post('/login',(req,res,next) => {
    res.send('function login')
})

route.post('/logout',(req,res,next) => {
    res.send('function logout')
})


module.exports = route