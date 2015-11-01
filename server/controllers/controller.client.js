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

// Parse AJAX response checkstatus data and toggle checkboxes accordingly ----
function setCheckboxes(data) {
  // console.log('Entered setCheckboxes');
  // If log has entries, remove the "No Log Entries" text
  // console.log(data);
  var checkObjects = data;
  // Check to see if 'checks' is empty
  if (checkObjects.length === 0) {
    return;
  }
  // Loop through the array of response objects to see which items are checked
  checkObjects.forEach(function(element){
    var idName = element.checkedItems;
    // if (idName.length > 0){
      var id = '#'+idName;
      // Check, disable, and set 'checked' class for input elements with ID
      $(id).prop('checked', true);
      $(id).prop('disabled', true);
      $(id).addClass('checked');
    // }
  });
}

// Execute AJAX request if page is ready to retrieve checkbox status ---------
// ready(ajaxRequest('GET', apiURL, 'checkstatus', '', setCheckboxes));

// Clear checklist checks ----------------------------------------------------
function clearChecks() {
  // Uncheck and enable all checkboxes
  $('input[type=checkbox]').each(function(){
    this.checked = false;
    $(this).prop('disabled', false);
  });

  // Remove 'checked' class from label so that it removes highlight
  // $('.checked').each(function(){
  //   $(this).closest('.checkbox-text, .checkbox').removeClass('checked');
  // });

  // Delete all 'checks' collection entries
  ajaxRequest('DELETE', apiURL, 'checkstatus', '', function(){
    return;
  });
}

// AJAX request (jQuery) -----------------------------------------------------
function ajaxRequest(method, url, type, id, callback) {
  // console.log('req');
  $.ajax({
    method: method,
    url: url+'/'+type,
    data:
      {
        checkedItems: id
      },
    dataType: "json",
    success: function(parsed_json){
      // console.log(url+'/'+type);
      // console.log(parsed_json);
      callback(parsed_json);
    }
  });
}

// Execute when page has finished loading ======================================
$(document).ready(function(){
  // console.log('test');
  // Get the status of the checkboxes and update page accordingly --------------
  ajaxRequest('GET', apiURL, 'checkstatus', '', setCheckboxes);

  // Event listeners -----------------------------------------------------------
  $('#new-flight').on('click', function(){
    clearChecks();
    ajaxRequest('POST', apiURL, $(this).attr('type'), $(this).attr('id'), function(){
      return;
    });
  });

  $('input[type=checkbox]').change(function(){
    // console.log(this.attributes);
    if (this.checked){
      // Add 'checked' class for highlighting
      // $(this).parent('label').addClass('checked');
      // Disable checkbox
      $(this).prop('disabled', true);
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
