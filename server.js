const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, collection: 'mySessions'
});

store.on('error', (err)=>{
    console.log(err);
})
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

require('./db/db');
require('dotenv').config();
// require('./passport/serializing');
// require('./passport/oauth-config');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


app.use(session({
    secret: 'fudgesicle',
    resave: false,
    saveUninitialized: false,
    store: store
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(_dirname, 'public/react-bookmatch/build')));


// passport.use('provider', new OAuth2Strategy({
//     authorizationURL: 'https://www.goodreads.com/oauth/authorize',
//     tokenURL: 'https://www.goodreads.com/oauth/token',
//     clientID: 'iDqJvSmeFc0pM6g4qThg',
//     clientSecret: 'M0SwmkTMgQ6H687m3cjZ7DzXzph0ZTxQzeFgnsgAec',
//     callbackURL: 'http://localhost:3000'

// }))

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController');
const booksController = require('./controllers/booksController');

app.use('/users', usersController);
app.use('/auth', authController);
app.use('/books', booksController);


app.get('*', (req,res)=>{
    res.sendFile(path.join(_dirname+'/public/react-bookmatch/build/index.html'));
});





app.listen(process.env.PORT || 9000, ()=>{
    console.log('listening on port 9000');
});

module.exports = app;