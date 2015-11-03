'use strict';

// var monthArr = [];
// monthArr[0] = "January";
// monthArr[0] = "January";
// monthArr[1] = "February";
// monthArr[2] = "March";
// monthArr[3] = "April";
// monthArr[4] = "May";
// monthArr[5] = "June";
// monthArr[6] = "July";
// monthArr[7] = "August";
// monthArr[8] = "September";
// monthArr[9] = "October";
// monthArr[10] = "November";
// monthArr[11] = "December";

function clickHandler (db) {
  // Assign db collections to variables
  var logs = db.collection('logs');
  var checks = db.collection('checks');

  // 'checks' collection functions =============================================
  // Get checkbox status entries -----------------------------------------------
  this.getStatus = function (req, res){
    var logProjection = { '_id': false };
    // Cannot use logs.find({}, logProjection, function...) because I am using
    // Mongo Node driver that is v2.0+
    checks.find().project(logProjection).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  };

  // Add checkbox status entry -------------------------------------------------
  this.addStatus = function (req, res){
    // Extract elementID parameter from request URL
    // var elementID = req.body.elementID;
    // console.log(req.body);
    // Insert elementID into 'checks' collection
    checks.insert(req.body, function (err, result){
        if (err) throw err;
        // Required in order to be able to process additional CRUD operations
        res.json(result);
      });
  };

  // Clear the 'checks' collection ---------------------------------------------
  this.deleteStatus = function (req, res){
    // Remove all 'checks' collection entries
    checks.remove({});
    // Required in order to be able to process additional CRUD operations
    res.end();
  }

  // 'logs' collection functions ===============================================
  // Add New Flight log entry --------------------------------------------------
  this.addNewFlight = function (req, res){
    logs.insert(
      {
        newFlightText: '-------- New Flight --------'
      },
      function (err, result){
        if(err) throw err;
        // Required in order to be able to process additional CRUD operations
        res.json(result);
    });
  };

  // Add log entries -----------------------------------------------------------
  this.addLog = function (req, res){
    // Prepend 0 to value if it's less than 10
    function leadingZero (value) {
      return ('0'+value).slice(-2);
    }

    var date = new Date();
    var day = leadingZero(date.getUTCDate());
    //var month = monthArr[date.getMonth()];
    var month = leadingZero(date.getUTCMonth()+1);
    var year = date.getUTCFullYear();
    var hour = leadingZero(date.getUTCHours());
    var minute = leadingZero(date.getUTCMinutes());
    var second = leadingZero(date.getUTCSeconds());
    var formattedTime = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+' UTC';
    logs.insert(
      {
        timestamp: formattedTime,
        listitem: 'test1'
      },
      function (err, result){
        if(err) throw err;
        // Required in order to be able to process additional CRUD operations
        res.json(result);
    });
  };

  // Get all log entries -------------------------------------------------------
  this.getLog = function (req, res){
    var logProjection = { '_id': false };
    // Cannot use logs.find({}, logProjection, function...) because I am using
    // Mongo Node driver that is v2.0+
    logs.find().project(logProjection).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  };

  // Delete all log entries ----------------------------------------------------
  this.deleteLog = function (req, res){
    logs.remove({});
    // Required in order to be able to process additional CRUD operations
    res.end();
  };
}

// Export clickHandler methods =================================================
module.exports = clickHandler;
