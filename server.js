'use strict';

// Include dependencies/modules ================================================
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var routes = require('./server/routes/index.js');

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
  // This needs to be placed before the routes (still not sure why)
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/controllers', express.static(__dirname + '/server/controllers'));
  // Enable features of body-parser module
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  routes(app, db);

  // Listen for incoming connections -------------------------------------------
  app.listen(3000, function() {
    // This log is only visible on server, not browser
    console.log('Listening on port 3000...');
  });

});
