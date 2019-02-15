const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');

router.route('/')
    .get(async (req,res)=>{
        try{
        const allBooks = await Book.find();
        res.json({
            status: 200,
            data: allBooks
        });

        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .post(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.session.userId);
            const addBook = await Book.findOrCreate({"title": req.body.title}, req.body);
            console.log(addBook, '  added Book thing');
            if(foundUser){
                foundUser.likedBooks.push(addBook.doc._id);
                await foundUser.save();
                res.json({
                    status: 200,
                    data: addBook
                });
            console.log(foundUser, '  found user')
            }else{
                console.log('cant find user')
            }
            
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const foundBook = await User.findById(req.params.id);
            res.json({
                status: 200,
                data: foundBook
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .delete(async (req,res)=>{
        try{
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            res.json({
                status: 200,
                data: deletedBook
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })


module.exports = router;