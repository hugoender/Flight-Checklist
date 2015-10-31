// CLIENT CONTROLLER ONLY NEEDS TO BE INCLUDED IN HTML NOT IN SERVER.JS

'use strict';

// $('input').on('swipe', function(){
//   // $(this).hide();
//   console.log('swipe');
//   if ($(this).prop('checked')) {
//     $(this).prop('checked', false);
//   }
//   else {
//     $(this).prop('checked', true)
//   }
// });
//
// // Change background color of list item and disable checkbox
// $('label').on('click', function () {
//   $(this).addClass('checked');
//   // $(this).firstChild.disabled = true;
//   // alert(this.nextSibling);
// });
//
// // *!*!!*!*!*! Need to figure out how to disable checkbox
// $('input').change(function() {
//   $(this).disabled = true;
// });

// IIFE in order to not pollute namespace
// (function () {

  // Define API endpoint
  var apiURL = 'http://localhost:3000/api/logs';
  // Define variables for different list items (use <input> id not <label> id)
  var logProp = document.querySelector('#list1');
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
  function ajaxRequest(method, url, type, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url+'/'+type, true);
    xmlhttp.send();
  }

  // Clear checklist checks ----------------------------------------------------
  function clearChecks() {
    $('input[type=checkbox]').each(function(){
      this.checked = false;
    });
  }

  // Event listeners -----------------------------------------------------------
  $('#new-flight').on('click', function(){
    clearChecks();
    ajaxRequest('POST', apiURL, $(this).attr('type'), function(){
      return;
    });
  });

  $('input[type=checkbox]').change(function(){
    // console.log(this.attributes);
    if (this.checked){
      ajaxRequest('POST', apiURL, '', function(data){
        return;
      });
      $(this).prop('disabled', true);
    }
  });

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
// })();
