// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

// IIFE in order to not pollute namespace
(function () {
  // Define API endpoint
  var apiURL = window.location.origin + '/api/logs' || 'http://localhost:3000/api/logs';
  // Define variables for different list items
  var logClear = document.querySelector('#clear-log');
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
      // Create and append each element to the #log-text span
      var paragraph = document.createElement('P');
      var hr = document.createElement('HR');

      // Check to see if the current element is a checkbox item or new flight
      if (element.newFlightText){
        var timest = document.createTextNode(element.timestamp);
        var text = document.createTextNode('------------- ' + element.newFlightText + ' -------------');
      }
      else {
        var timest = document.createTextNode(element.timestamp);
        var text = document.createTextNode(element.listitem);
      }

      hr.appendChild(timest);
      paragraph.appendChild(hr);
      paragraph.appendChild(text);
      logText.appendChild(paragraph);
      // logText.appendChild(hr);
    });
  }

  // Execute AJAX request if page is ready -------------------------------------
  ready(ajaxRequest('GET', apiURL, getLog));

  // Event listeners -----------------------------------------------------------
  logClear.addEventListener('click', function(){
    ajaxRequest('DELETE', apiURL, function(){
      ajaxRequest('GET', apiURL, getLog);
    });
  }, false);

})();
