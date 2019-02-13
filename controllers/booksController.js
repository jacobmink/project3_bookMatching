const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.route('/')
    .get(async (req,res)=>{
        try{
        const allBooks = await Book.find();
        console.log(allBooks, ' this is all books')

        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .post(async (req,res)=>{
        try{
            const newBook = await Book.findOrCreate({title: req.body.title}, req.body);
            res.json({
                status: 200,
                data: newBook
            });
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