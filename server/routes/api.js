/**
 * Created by m on 1/13/2017.
 */
const express = require('express');
const router = express.Router();
var CoreCourse = require('../models/core_course');
var BaseCoures = require('../models/base_course');
var User = require('../models/user');
var crypto = require('crypto');
var Message = require('../models/message');

function randomValueHex (len) {
  return crypto.randomBytes(Math.ceil(len/2))
    .toString('hex') // convert to hexadecimal format
    .slice(0,len);   // return required number of characters
}

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
  var pid = randomValueHex(12);

  var newBaseCoures = new BaseCoures({
    teachersId: tid,
    course: cid,
    pageId: pid,
  });

  User.findOneAndUpdate({_id:tid},{$push:{courses:pid}},{upsert:true},function (err) {
    if(err)
      console.log(err);
    else
      console.log("Added Course in User");
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

router.post('/joinBaseCourse',function (req,res) {
  var pid = req.body.pid;
  var uid = req.body.uid;

  User.findOneAndUpdate({_id:uid},{$push:{courses:pid}},{upsert:true},function (err) {
    if(err)
      console.log(err);
  });
  BaseCoures.findOneAndUpdate({pageId:pid},{$push:{studentsId:uid}},{upsert:true},function (err) {
    if(err)
      console.log(err);
    else
      res.send(200);
  });
});

router.post('/getBaseCourse',function (req,res) {
  var tid = req.body.tid;

  BaseCoures.find({'teachersId':tid})
    .populate('course')
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

router.post('/getBaseCourseById',function (req,res) {
  var pid = req.body.pid;

  BaseCoures.find({'pageId':pid})
    .populate('course teachersId')
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

router.post('/getAllBase',function (req,res) {
  BaseCoures.find()
    .populate('course teachersId')
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

router.post('/addMessage',function (req,res) {
  var pid = req.body.pid;
  var uid = req.body.uid;
  var message = req.body.messge;
  var time = req.body.time;
  var newMessage = new Message({
    'sendersId':uid,
    'message':message,
    'date':time
  });

  var currMessage = Message.createMessage(newMessage);
  // console.log(currMessage);

  BaseCoures.findOneAndUpdate({pageId:pid},{$push:{messages:currMessage}},{upsert:true},function (err) {
      if(err){
        console.log(err);
      }
  });
  res.send(200);
});

module.exports = router;
