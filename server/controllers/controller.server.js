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
  var logs = db.collection('logs');

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

  this.getLog = function (req, res){
    var logProjection = { '_id': false };
    // Cannot use logs.find({}, logProjection, function...) because I am using
    // Mongo Node driver that is v2.0+
    logs.find().project(logProjection).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  };

  this.deleteLog = function (req, res){
    logs.remove({});
    // Required in order to be able to process additional CRUD operations
    res.end();
  };
}

module.exports = clickHandler;
