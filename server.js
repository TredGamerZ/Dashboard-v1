/**
 * Created by m on 1/13/2017.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/myapp');
var db = mongoose.connection;
// Get our API routes
const api = require('./server/routes/api');
const users = require('./server/routes/users');

var app =  express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash() );

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Set our api routes
app.use('/api', api);
app.use('/users', users);

// Catch all other routes and return the index file
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
var pageId;
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io')(server);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function(){
  console.log(`API running on localhost:${port}`);
});



io.on('connection',function (socket) {
  console.log("A user is connected");
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('message', function(msg){
    console.log('message: ' + msg);
    // io.emit('message',"VOILABITCH");

  });



  //NEW ID ========================
//  ==============================

  socket.on('idOf',(msg)=> {
    pageId = msg;
    console.log(pageId);

    socket.join(pageId);
    io.to(pageId).emit('announce',pageId);

    socket.on('check',function () {
      io.to(pageId).emit('announce','dumb Bitch');
    });
  });
});
