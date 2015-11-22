'use strict';

// Define API endpoint -------------------------------------------------------
var apiURL = window.location.origin + '/api/logs' || 'http://localhost:3000/api/logs';
// Last checked list item in order to enable next list item
var lastID = '';

// AJAX request (jQuery) -------------------------------------------------------
function ajaxRequest(method, url, type, id, callback) {
  $.ajax({
    method: method,
    url: url+'/'+type,
    data:
      {
        checkedItem: id
      },
    dataType: "json",
    success: function(parsed_json){
      callback(parsed_json);
    }
  });
}

// Parse AJAX response checkstatus data and toggle checkboxes accordingly ------
function setCheckboxes(data) {
  var checkObjects = data;
  // Loop through the array of response objects to see which items are checked
  checkObjects.forEach(function(element){
    var idName = element.checkedItem;
    lastID = '#'+idName;
    // Check, disable, and set 'checked' class for input elements with ID
    $(lastID).prop('checked', true);
    $(lastID).prop('disabled', true);
    $(lastID).addClass('checked');
  });

  // Parse out the item number and convert it to integer
  var idNumber = parseInt(lastID.replace('#item', ''), 10);
  // Increment id number to go to next checklist item
  idNumber++;
  lastID = '#item' + idNumber;
  // Find next checklist item and enable it
  $(lastID).prop('disabled', false);
  // $(lastID).parent().next().children('input').prop('disabled', false);

  // Make all list items visible now that they have been styled
  $('.check-list').css("visibility", "visible");
}

// Get the status of the checkboxes and update page accordingly ----------------
ajaxRequest('GET', apiURL, 'checkstatus', '', setCheckboxes);
