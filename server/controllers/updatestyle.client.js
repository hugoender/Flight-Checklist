'use strict';

// Define API endpoint -------------------------------------------------------
var apiURL = 'http://localhost:3000/api/logs';

// AJAX request (jQuery) -------------------------------------------------------
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
      // console.log(url+'/'+type);
      // console.log(parsed_json);
      callback(parsed_json);
    }
  });
}

// Parse AJAX response checkstatus data and toggle checkboxes accordingly ------
function setCheckboxes(data) {
  // console.log('Entered setCheckboxes');
  // If log has entries, remove the "No Log Entries" text
  // console.log(data);
  var checkObjects = data;
  // Check to see if 'checks' is empty
  // if (checkObjects.length === 0) {
  //   return;
  // }
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

  // Make all list items visible now that they have been styled
  $('.check-list').css("visibility", "visible");
}

// Get the status of the checkboxes and update page accordingly ----------------
ajaxRequest('GET', apiURL, 'checkstatus', '', setCheckboxes);
