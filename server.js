const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./lib/user.js');

app.use(cookieParser());
app.use(session({ secret: "klondike filter zero drive", resave: false, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('dist'));

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log('Attempting localstrategy.');
      User.findOne({username: username }, function(err, user) {
        if (err) {
          console.log('findUser returned an error: ', err);
          return done(err);
        }
        if (!user) {
          console.log("findUser didn't find that user.");
          return done(null, false, { message: 'Incorrect username. '});
        }
        if (!user.validPassword(password)) {
          console.log('Invalid password.', err);
          return done(null, false, { message: 'Incorrect password.'});
        }
        console.log('Looks like login succeeded.')
        return done(null, user); // Successful login? Return the userID to the done callback, so it can stored in the session key.
      });
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login.html',
                                    failureFlash: true})
);

app.get('login', () => {
  res.send('app.get : login');
});

app.listen(port, () => {
  console.log(`Minimal Passport.js test running on port ${port}`);
})