/**
 * Created by m on 1/18/2017.
 */
var mongoose = require('mongoose');

// START OF SCHEMAS ===============================================================
// ================================================================================

var CoreCourseSchema = mongoose.Schema({


  code:{
    type:String,
    index:true,
  },
  name:{
    type:String,
    // index:true,
  },
  semester:{
    type:Number,
  },
  description:{
    type:String,
    // index:true,
  },

});

var CoreCourse = module.exports = mongoose.model('CoreCourse',CoreCourseSchema);

// END OF SCHEMA ==================================================================
// ================================================================================

// START FUNCTIONS ================================================================
// ================================================================================
module.exports.getCoreCourseByCode = function (code,callback) {
  var query = {code: code};
  CoreCourse.findOne(query, callback);
};
