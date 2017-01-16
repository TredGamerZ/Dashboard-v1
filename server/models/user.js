/**
 * Created by m on 1/14/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// mongoose.connect('mongodb://localhost/myapp');
// var db = mongoose.connection;

var UserSchema = mongoose.Schema({

    name:{
      type:String,
      // index:true,
    },
    username:{
      type:String,
      index:true
    },
    password:{
      type:String,
    },
    email:{
      type: String,
    },
    type:{
      type: Number,
    },
    courses:{
      type: Array,
    },
    department:{
      type:String,
    } ,
    semester:{
      type:Number,
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function (newUser,callback) {
  var bcrypt = require('bcryptjs');
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}
