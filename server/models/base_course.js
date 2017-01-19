// /**
//  * Created by m on 1/18/2017.
//  */
var mongoose = require('mongoose');
var CoreCourse = require('../models/core_course');
var Message = require('../models/message');
var User = require('../models/user');

var BaseCourseSchema = mongoose.Schema({

  teachersId:{ type:mongoose.Schema.ObjectId,ref:'User'},
  studentsId:[{type:mongoose.Schema.ObjectId,ref:'User'}],
  messages:[{type:mongoose.Schema.ObjectId,ref:'Message'}],
  pageId:{type:String},
  course:{type: mongoose.Schema.Types.ObjectId, ref:'CoreCourse'}
});

var BaseCourse = module.exports = mongoose.model('BaseCourse', BaseCourseSchema);

module.exports.createBaseCourse = function (newBaseCourse,callback) {
  newBaseCourse.save(callback);
};
