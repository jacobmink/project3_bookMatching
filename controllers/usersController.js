const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

router.route('/')
    .get(async (req,res)=>{
        try{
            const allUsers = await User.find();
            res.json({
                status: 200,
                data: allUsers
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .post(async (req,res)=>{
        try{
            const newUser = await User.create(req.body);
            res.json({
                status: 200,
                data: newUser
            });
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })

router.route('/books/:id')
    .delete(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.session.userId);
            if(foundUser){
                foundUser.likedBooks = foundUser.likedBooks.filter(bookId => bookId.toString() !== req.params.id.toString())
                await foundUser.save();
                res.json({
                    status: 200,
                    data: foundUser
                })
                console.log(foundUser, '   foundUser from server')
            }else{
                console.log('user not found')
            }
            
        }catch(err){
            res.send(err);
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id).populate('likedBooks');
            res.json({
                status: 200,
                data: foundUser
            })
        }catch(err){
            res.send(err);
        }
    })
    .put(async (req,res)=>{
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
            res.json({
                status: 200,
                data: updatedUser
            })
        }catch(err){
            res.send(err);
        }
    })
    .delete(async (req,res)=>{
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.json({
                status: 200,
                data: deletedUser
            })
        }catch(err){
            res.send(err);
        }
    })



module.exports = router;