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

// Define API endpoint -------------------------------------------------------
var apiURL = 'http://localhost:3000/api/logs';

// AJAX request (VanillaJS) --------------------------------------------------
// function ajaxRequest(method, url, type, id, callback) {
//   var xmlhttp = new XMLHttpRequest();
//   //var params = ''
//
//   xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//       callback(xmlhttp.response);
//     }
//   };
//   // Check to see if CRUD operation comes with an id parameter
//   if (id.length) {
//     console.log(url+'/'+type+'?elementID='+id);
//     xmlhttp.open(method, url+'/'+type+'?elementID='+id, true);
//   }
//   else {
//     xmlhttp.open(method, url+'/'+type, true);
//   }
//
//   //xmlhttp.send(params);
//   xmlhttp.send();
// }

// Clear checklist checks ----------------------------------------------------
function clearChecks() {
  // Uncheck and enable all checkboxes
  $('input[type=checkbox]').each(function(i){
    this.checked = false;
    // If it's the first list item, do not disable
    if (i === 0) {
      $(this).prop('disabled', false);
    }
    else {
      $(this).prop('disabled', true);
    }
  });

  // Delete all 'checks' collection entries
  ajaxRequest('DELETE', apiURL, 'checkstatus', '', function(){
    return;
  });
}

// AJAX request (jQuery) -----------------------------------------------------
function ajaxRequest(method, url, type, id, callback) {
  $.ajax({
    method: method,
    url: url+'/'+type,
    data:
      {
        checkedItems: id
      },
    dataType: "json",
    success: function(parsed_json){
      callback(parsed_json);
    }
  });
}

// Execute when page has finished loading ======================================
$(document).ready(function(){
  // Event listeners -----------------------------------------------------------
  $('#new-flight').on('click', function(){
    clearChecks();
    ajaxRequest('POST', apiURL, $(this).attr('type'), $(this).attr('id'), function(){
      return;
    });
  });

  $('input[type=checkbox]').change(function(){
    if (this.checked){
      // Disable checkbox
      $(this).prop('disabled', true);
      // Enable next checkbox
      console.log($(this).next(':checkbox'));
      $(this).next().prop('disabled', false);
      // Send checked item id to set check status in 'checks' collection
      ajaxRequest('POST', apiURL, 'checkstatus', $(this).attr('id'), function(data){
        return;
      });
      // Send log entry to 'logs' collection
      ajaxRequest('POST', apiURL, '', '', function(data){
        return;
      });

    }
  });
});

// Check item on swipe
// $("h3").on("swipe", function(){
//   $(this).hide();
//   console.log('swipe');
//   // if ($("this>input").prop('checked')) {
//   //   $("this>input").prop('checked', false);
//   // }
//   // else {
//   //   $("this>input").prop('checked', true)
//   // }
