// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

// IIFE in order to not pollute namespace
(function () {

  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  // Define variables for different list items
  var logProp = document.querySelector('#list-prop');

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

  // Event listeners -----------------------------------------------------------
  logProp.addEventListener('click', function(){
    ajaxRequest('POST', apiURL, function(data){
      return;
    });
  }, false);

})();
