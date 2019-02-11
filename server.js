const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

require('./db/db');
require('dotenv').config();

app.use(session({
    secret: 'fudgesicle',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController')

app.use('/users', usersController);
app.use('/auth', authController);


app.listen(process.env.PORT || 9000, ()=>{
    console.log('listening on port 9000');
});

module.exports = app;