/**
 * Created by m on 1/13/2017.
 */
const express = require('express');
const router = express.Router();

// GET INDEX API
router.get('/',function (req,res) {
  res.send('API WORKS');
});

module.exports = router;
