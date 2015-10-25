'use strict';

var ClickHandler = require(process.cwd() + '/server/controllers/controller.server.js');

module.exports = function (app, db) {
  // Assign the ClickHandler object and it's methods to a var
  var clickHandler = new ClickHandler (db);

  // Handle the routing of various requests ------------------------------------
  app.route('/')
      .get(function(req, res) {
        res.sendFile(process.cwd()+'/public/index.html');
      });

  app.route('/log')
      .get(function(req, res) {
        res.sendFile(process.cwd() + '/public/log.html');
      });

  app.route('/api/logs')
      // .get(function(req, res){
      //   res.send("hello get");
      // })
      .get(clickHandler.getLog)
      .post(clickHandler.addLog)
      .delete(clickHandler.deleteLog);
};
