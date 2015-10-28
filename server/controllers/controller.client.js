// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

// IIFE in order to not pollute namespace
(function () {

  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  // Define variables for different list items
  var logProp = document.querySelector('#list-prop');
  var logButton = document.querySelector('#log-button');
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
    console.log(logObjects.length);
    if (logObjects.length > 0) {
      logText.innerHTML = '';
    }
    // Loop through the array of response objects
    logObjects.forEach(function(element){
      // Create and append each element to the #log-text span
      var paragraph = document.createElement('P');
      var text = document.createTextNode(element.timestamp + ' - ' + element.listitem);
      paragraph.appendChild(text);
      logText.appendChild(paragraph);
    });
  }

  // Execute AJAX request if page is ready -------------------------------------
  //ready(ajaxRequest('GET', apiURL, updateLog));


  // Event listeners -----------------------------------------------------------
  logProp.addEventListener('click', function(){
    ajaxRequest('POST', apiURL, function(data){
      return;
    });
  }, false);

  logButton.addEventListener('click', function(){
    ajaxRequest('GET', apiURL, getLog);
  }, false);

})();
