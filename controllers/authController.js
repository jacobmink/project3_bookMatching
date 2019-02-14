const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const passport = require('passport');

router.post('/login', async (req,res)=>{
    

    // passport.authenticate('goodreads', { successRedirect: '/',
    // failureRedirect: '/login'});
    
    try{
        const user = await User.findOne({"username": req.body.username});
        
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.logged = true;
                req.session.userId = user._id;
                req.session.username = req.body.username;
                res.json({
                    status: 200,
                    data: 'login successful',
                    info: user
                })
                console.log(req.session, ' this is session');
            }else{
                res.json({
                    status: 200,
                    data: 'Incorrect username or password'
                })
            }
        }else{
            res.json({
                status: 200,
                data: 'User not found'
            })
        }
        
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.post('/registration', async (req,res)=>{
    try{
        const hashedPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        req.body.password = hashedPass;
        const createdUser = await User.create(req.body);
        req.session.logged = true;
        req.session.username = req.body.username;
        res.json({
            status: 200,
            data: 'registration successful'
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
    
})

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send(err);
        }
        res.json({
            status: 200,
            data: 'logout successful'
        })
    })
})

// router.get('/goodreads', (req,res)=>{
//     console.log('trying to authenticate at goodreads')
//     passport.authenticate('goodreads')

//     }

    
    
// )

// router.get('/goodreads/callback', (req,res)=>{
//     console.log('REDIRECTED FROM GOODREADS SUCCESS');
//     passport.authenticate('goodreads', {successRedirect: '/', failureRedirect: '/login'})
// })










module.exports = router;