var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var databasePath = "mongodb://localhost:27017/comments-test";
var highestOrder = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(databasePath, function(err, db) {
    if(err) {
      throw err;
    }
    db.collection('comments').find().toArray(function(err, result) {
      if(err) {
        throw err;
      }
      for(var i = 0; i < result.length; i++) {
        if(result[i].order > highestOrder) {
          highestOrder = result[i].order;
        }
      }
      res.render('index', { title: 'Express' , "commentslist": result});
    });
  });

});
router.post('/addComment', function(req, res, next) {
  MongoClient.connect(databasePath, function(err, db) {
    var comment = req.body.comment;
    if(err) {
      throw err;
    }
    db.collection('comments').find().toArray(function(err, result) {
      if(err) {
        throw err;
      }
    });
    db.collection('comments').insert({"order": highestOrder + 1, "content": comment});
    res.redirect('/');
  });
});

module.exports = router;
