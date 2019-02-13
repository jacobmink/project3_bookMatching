const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

require('./db/db');
require('dotenv').config();
// require('./passport/serializing');
// require('./passport/oauth-config');

app.use(session({
    secret: 'fudgesicle',
    resave: false,
    saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// passport.use('provider', new OAuth2Strategy({
//     authorizationURL: 'https://www.goodreads.com/oauth/authorize',
//     tokenURL: 'https://www.goodreads.com/oauth/token',
//     clientID: 'iDqJvSmeFc0pM6g4qThg',
//     clientSecret: 'M0SwmkTMgQ6H687m3cjZ7DzXzph0ZTxQzeFgnsgAec',
//     callbackURL: 'http://localhost:3000'

// }))

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController')

app.use('/users', usersController);
app.use('/auth', authController);








app.listen(process.env.PORT || 9000, ()=>{
    console.log('listening on port 9000');
});

module.exports = app;