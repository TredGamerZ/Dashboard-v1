/**
 * Created by m on 1/13/2017.
 */
const express = require('express');
const router = express.Router();
var CoreCourse = require('../models/core_course');
var BaseCoures = require('../models/base_course');
// GET INDEX API
router.get('/',function (req,res) {
  res.send('API WORKS');
});


router.post('/getall',function (req,res) {
  console.log("got it");
  CoreCourse.find({},function (err,callback) {
    if(!err){
      // console.log(callback);
      res.send(callback);
    }
    else
    console.log(err);

  })
});

router.post('/saveBaseCourse',function (req,res) {
  var tid = req.body.tid;
  var cid = req.body.cid;

  var newBaseCoures = new BaseCoures({
    teachersId: tid,
    course: cid,
  });

  BaseCoures.createBaseCourse(newBaseCoures,function (err,course) {
    if(err) {
      res.send('fail');
      console.log(err);
    }
    else {
      console.log("Base Course Created");
      // console.log(course);
      res.send("success");
    }
  })
});

router.post('/getBaseCourse',function (req,res) {
  var tid = req.body.tid;

  BaseCoures.find({'teachersId':tid})
    .populate('course')
    .select('course')
    .exec(function (err,doc) {
    if(err)
      res.send("1");
    else
    {
      console.log(doc);
      res.send(doc);
    }
  })
});

module.exports = router;
