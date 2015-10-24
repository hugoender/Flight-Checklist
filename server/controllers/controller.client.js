// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

(function () {
  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  // Define variables for different list items
  var logProp = document.querySelector('#list-prop');

  // !*!*!*!*! Not sure what this does or how it works !*!*!*!*!*!*!**!*!*!**!*!
  // function ready (fn) {
  //   if (typeof fn !== 'function') {
  //     return;
  //   }
  //
  //   if (document.readyState === 'complete') {
  //     return fn();
  //   }
  //
  //   document.addEventListener('DOMContentLoaded', fn, false);
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

  // Function to initialialize log ---------------------------------------------
  // ready(ajaxRequest('GET', apiURL, ))


  // Event listeners -----------------------------------------------------------
  logProp.addEventListener('click', function(){
    ajaxRequest('POST', apiURL);
  }, false);
})();
