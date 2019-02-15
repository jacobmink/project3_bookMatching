const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected');
});
mongoose.connection.on('error', (err)=>{
    console.log(err, ' mongoose failed to connect')
});
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose is disconnected');
});