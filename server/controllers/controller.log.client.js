// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

var logText = document.querySelector('#log-text');

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

  // AJAX request function -----------------------------------------------------
  function ajaxRequest(method, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

  // Parse AJAX response data and place it in log.html -------------------------
  function getLog(data) {
    // If log has entries, remove the "No Log Entries" text
    var logObjects = JSON.parse(data);
    // Check to see if log is empty
    if (logObjects.length === 0) {
      logText.innerHTML = 'No logs';
    }
    // Loop through the array of response objects
    logObjects.forEach(function(element){
      logText.innerHTML = 'No logs';
      // Create and append each element to the #log-text span
      var paragraph = document.createElement('P');
      var text = document.createTextNode(element.timestamp + ' - ' + element.listitem);
      paragraph.appendChild(text);
      logText.appendChild(paragraph);
    });
  }

  // Execute AJAX request if page is ready -------------------------------------
  ready(ajaxRequest('GET', apiURL, getLog));

})();
