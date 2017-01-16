/**
 * Created by m on 1/13/2017.
 */
const express = require('express');
const router = express.Router();

var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//POST REQUEST FROM REGSITER

router.post('/register',function(req,res){
  // console.log(req.body.name+''+req.body.username+'');
  //SETTING UP
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var type = req.body.type;
  var email = req.body.email;

  //VALIDATION
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('type', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.send(errors);
  }
  else {
    res.send('success');

    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      type: type,
    });
    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user + " You are registered");
    });
  };
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login', function (req,res,next) {
  var username = req.body.username;
  var password = req.body.password;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  console.log(req.body);
  var errors = req.validationErrors();

  if(errors){
    console.log("error");
    res.send('error');
  }
  else {
    console.log("no error");

    // passport.authenticate('local', function(err, user, info) {
    //   console.log("Commenced");
    //   if (err) {
    //     return res.send(err);
    //   }
    //   if (!user) {
    //     console.log("user not found");
    //     return res.send('User Not Found');
    //   }
    //   req.logIn(user, function(err) {
    //
    //     if (err) { return res.send(err);}
    //
    //     console.log("User found");
    //     return res.send(user);
    //
    //   });
    // })
    next();
  }
},function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send('u1'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user.id);
    });
  })(req, res, next);
});
module.exports = router;
