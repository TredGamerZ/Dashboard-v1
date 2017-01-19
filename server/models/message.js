/**
 * Created by m on 1/19/2017.
 */
var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  senderId:{
    type: mongoose.Schema.Types.ObjectId, ref:'User'
  },
  message:String,
  date:String,

});



var Message = module.exports = mongoose.model('Message',MessageSchema);

module.exports.createMessage = function (message,callback) {
  message.save();
  return message._id;
};
