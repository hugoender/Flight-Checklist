// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

// IIFE in order to not pollute namespace
(function () {

  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  var logText = document.querySelector('#log-text');

  // Make sure page is ready before executing callback function ----------------
  function ready (fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  // AJAX request --------------------------------------------------------------
  // function ajaxRequest(method, url, callback) {
  //   $.ajax({
  //     method: method,
  //     url: url,
  //     dataType: "jsonp",
  //     success: function(parsed_json){
  //       callback(parsed_json);
  //     }
  //   });
  // }

  // AJAX request function -----------------------------------------------------
  function ajaxRequest(method, url, callback) {
    console.log('Entered AJAX');
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
      else {
        console.log(xmlhttp.readyState);
        console.log(xmlhttp.status);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

  // Parse AJAX response data and place it in log.html -------------------------
  function updateLog(data) {
    console.log('Entered updateLog');
    var logObject = JSON.parse(data);
    logText.innerHTML = logObject.timestamp + ' - ' + logObject.listitem;
  }

  // Execute AJAX request if page is ready -------------------------------------
  ready(ajaxRequest('GET', apiURL, updateLog));

})();
