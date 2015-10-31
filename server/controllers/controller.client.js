// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

$('input').on('swipe', function(){
  // $(this).hide();
  console.log('swipe');
  if ($(this).prop('checked')) {
    $(this).prop('checked', false);
  }
  else {
    $(this).prop('checked', true)
  }
});

// Change background color of list item and disable checkbox
$('label').on('click', function () {
  $(this).addClass('checked');
  // $(this).firstChild.disabled = true;
  // alert(this.nextSibling);
});

// *!*!!*!*!*! Need to figure out how to disable checkbox
$('input').change(function() {
  $(this).disabled = true;
});

// IIFE in order to not pollute namespace
(function () {

  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  // Define variables for different list items
  var logProp = document.querySelector('#list-prop');
  //var logClear = document.querySelector('#clear-log');

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

  // Check item on swipe
  // $(document).ready(function(){
    // $("h3").on("swipe", function(){
    //   $(this).hide();
    //   console.log('swipe');
    //   // if ($("this>input").prop('checked')) {
    //   //   $("this>input").prop('checked', false);
    //   // }
    //   // else {
    //   //   $("this>input").prop('checked', true)
    //   // }
    // });
  // });
})();
