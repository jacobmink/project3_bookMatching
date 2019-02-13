const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const passport = require('passport');

router.post('/login', async (req,res)=>{
    console.log(req.session, ' this is session');

    // passport.authenticate('goodreads', { successRedirect: '/',
    // failureRedirect: '/login'});
    
    try{
        const user = await User.create(req.body);
        req.session.logged = true;
        req.session.username = req.body.username;
        res.json({
            status: 200,
            data: 'login successful'
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

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