var lastCall;
var suggestions = [];
$('#user-input').keyup(function () {
  var userInput = $(this).val();
  $('#sugestions').empty();
  $.post(
    '/autocomplete',
    { userInput: userInput },
    function (response, status) {
      for (var i = 0; i < response.length; i++) {
        $('#sugestions').append(
          '<p>' +
            response[i].firstname +
            ' ' +
            response[i].lastname +
            ' Email: ' +
            response[i].email +
            '</p>'
        );
      }

      for (var i = 0; i < response.length; i++) {
        $("#suggestions").append("<option value='" + response[i].firstname + " " + response[i].lastname + "'></option>")
      }
    }
  );
});
