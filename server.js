'use strict';

// Include dependencies/modules ================================================
var express = require('express');
var mongo = require('mongodb').MongoClient;

// Assign express object (and it's methods) to app =============================
var app = express();

// URLs and ports ==============================================================
var port = 3000;
var mongoport = 27017;
var dburl = 'mongodb://localhost:' + mongoport + '/checklistapp';

// Connect to MongoDB ==========================================================
mongo.connect(dburl, function(err, db){

  // Handle error --------------------------------------------------------------
  if (err) {
    throw new Error('Database failed to connect!');
  }
  else {
    // This log is only visible on server, not browser
    console.log('MongoDB successfully connected on port' + mongoport + '.' );
  }

  // Define middleware usage ---------------------------------------------------
  // May need to specify '/public' path to distinguish from '/controllers'
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/controllers', express.static(__dirname + '/server/controllers'));

  // Handle the routing of various requests ------------------------------------
  app.route('/')
      .get(function(req, res) {
        res.sendFile(process.cwd()+'/public/index.html');
      });

  app.route('/api/logs')
      .get(function(req, res) {
        console.log('GET received!');
      })
      .post(function(req, res) {
        console.log('POST received!');
      });

  // Define what to do when checkboxes are checked -----------------------------


  // Listen for incoming connections -------------------------------------------
  app.listen(3000, function() {
    // This log is only visible on server, not browser
    console.log('Listening on port 3000...');
  });

});
