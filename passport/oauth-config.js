const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;
const User = require('../models/user');


// passport.use('goodreads', new OAuth2Strategy({
//     authorizationURL: 'https://www.goodreads.com/oauth/authorize',
//     tokenURL: 'https://www.goodreads.com/oauth/token',
//     clientID: 'iDqJvSmeFc0pM6g4qThg',
//     clientSecret: 'M0SwmkTMgQ6H687m3cjZ7DzXzph0ZTxQzeFgnsgAec',
//     callbackURL: 'https://localhost:3000/auth/goodreads/callback'
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('_________GOODREADS PROFILE_______')
//     console.log(profile);
//     User.findOrCreate({goodreadsId: profile.id}, function(err, user) {
//       return done(err, user);
//     });
//   }
// ));

passport.use('provider', new OAuthStrategy({
  requestTokenURL: 'https://www.goodreads.com/oauth/request_token',
  accessTokenURL: 'https://www.goodreads.com/oauth/access_token',
  userAuthorizationURL: 'https://www.goodreads.com/oauth/authorize',
  consumerKey: 'iDqJvSmeFc0pM6g4qThg',
  consumerSecret: 'M0SwmkTMgQ6H687m3cjZ7DzXzph0ZTxQzeFgnsgAec',
  callbackURL: 'https://localhost:9000/auth/goodreads/callback'
},
function(token, tokenSecret, profile, done) {
  console.log('_________GOODREADS PROFILE_______')
  console.log(profile);
  User.findOrCreate({goodreadsId: profile.id}, function(err, user) {
    done(err, user);
  });
}
));