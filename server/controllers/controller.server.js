'use strict';

var monthArr = [];
monthArr[0] = "January";
monthArr[0] = "January";
monthArr[1] = "February";
monthArr[2] = "March";
monthArr[3] = "April";
monthArr[4] = "May";
monthArr[5] = "June";
monthArr[6] = "July";
monthArr[7] = "August";
monthArr[8] = "September";
monthArr[9] = "October";
monthArr[10] = "November";
monthArr[11] = "December";

function clickHandler (db) {
  var logs = db.collection('logs');

  this.addLog = function (req, res){
    var date = new Date();
    var day = date.getDate();
    var month = monthArr[date.getMonth()];
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var formattedTime = month+' '+day+', '+year+' '+hour+':'+minute+':'+second;
    logs.insert(
      {
        timestamp: formattedTime,
        listitem: 'test'
      },
      function (err, result){
        if(err) throw err;
        // Required in order to be able to process additional CRUD operations
        res.json(result);
    });
  };

  this.getLog = function (req, res){
    var logProjection = { '_id': false };
    var logDocsArr = logs.find({}).toArray();
    console.log(logDocsArr);
    // for (var i = 0; i < logs.count(); i++){
    //   console.log(logDocsArr[i]);
    //   res.json(logDocsArr[i]);
    // }

    logs.findOne({}, logProjection, function (err, result) {
      if (err) throw err;

      if (result) {
        res.json(result);
      }
      else {
        logs.insert({}, function (err){
          if (err) throw err;

          logs.findOne({}, logProjection, function(err, doc) {
            if (err) throw err;

            res.json(doc);
          });
        });
      }
    });

    //console.log(json(logs.find({})));
    // var clickProjection = { '_id': false, 'timestamp': true, 'listitem': true};
    // var test = logs.find({});
    // , function (err, result){
    //   if (err) throw err;
    //   res.json(result);
    // });
    // res.send("Hello ALLO!");
  };

  this.deleteLog = function (req, res){
    logs.remove({});
    // Required in order to be able to process additional CRUD operations
    res.end();
  };
}

module.exports = clickHandler;
