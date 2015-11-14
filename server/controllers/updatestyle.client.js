'use strict';

// Define API endpoint -------------------------------------------------------
var apiURL = 'http://107.170.6.54:3000/api/logs';
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

  $(lastID).parent().next().children('input').prop('disabled', false);

  // Make all list items visible now that they have been styled
  $('.check-list').css("visibility", "visible");
}

// Get the status of the checkboxes and update page accordingly ----------------
ajaxRequest('GET', apiURL, 'checkstatus', '', setCheckboxes);
