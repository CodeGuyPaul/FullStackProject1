document.getElementsByTagName("h1")

$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
});

$(document).ready(function() {
  $("#clear-button").click(function() {
    $("input[type=text]").val("")
    $("#adults").val(1);
    $("input[type=date]").val("")
    $("#text-area").val("");
    $("#range-bar").val(5);
    $("#low-radio").prop('checked', true);
    $("#med-radio").prop('checked', false);
    $("#high-radio").prop('checked', false);
    toastr["info"]("All fields successfully cleared")
    });
 });

$("input[type=date]").change(updateCost);
$("#adults").change(updateCost);

function updateCost() {       
  let checkIn = moment($("#check-in").val());
  let checkOut = moment($("#check-out").val());
  let dayNum = checkOut.diff(checkIn, 'days');
  let cost = 150 * $("#adults").val() * dayNum;
  $("#day-diff").val(dayNum);
  $("#cost").val(cost);
};

$("#submit-button").click(function() { 
  let encounteredError = false;
  toastr.remove()
  $("#user-name-error").removeClass('has-error');
  $("#first-name-error").removeClass('has-error');
  $("#last-name-error").removeClass('has-error');
  $("#phone-num-error").removeClass('has-error');
  $("#fax-num-error").removeClass('has-error');
  $("#email-error").removeClass('has-error');
  
  if($("#user-name").val() == "") {
    $("#user-name-error").addClass('has-error');
    toastr["error"]("Missing Username");
    encounteredError = true;
  }
  if($("#first-name").val() == "") {
    $("#first-name-error").addClass('has-error');
    toastr["error"]("Missing First Name");
    encounteredError = true;
  }
  if($("#last-name").val() == "") {
    $("#last-name-error").addClass('has-error');
    toastr["error"]("Missing Last Name");
    encounteredError = true;
  }
  if($("#phone-num").val() == "") {
    $("#phone-num-error").addClass('has-error');
    toastr["error"]("Missing Phone Number");
    encounteredError = true;
  }
  if($("#fax-num").val() == "") {
    $("#fax-num-error").addClass('has-error');
    toastr["error"]("Missing Fax Number");
    encounteredError = true;
  }
  if($("#email").val() == "") {
    $("#email-error").addClass('has-error');
    toastr["error"]("Missing Email");
    encounteredError = true;
  }
  
  let checkIn = $("#check-in").val();
  let checkOut = $("#check-out").val();
  
  if(checkIn == "NaN" || checkOut == "NaN" || checkIn == "" || checkOut == "") {
    toastr["error"]("No cost was calculated");
    encounteredError = true;
  }
  
  let checkIn2 = moment(checkIn);
  let checkOut2 = moment(checkOut);
  let dayNum = checkOut2.diff(checkIn2, 'days');
  if (dayNum < 0) {
    toastr["error"]("Cost is negative");
    encounteredError = true;
  }
  if (encounteredError == false) {
    toastr["success"]("The form was successfully submitted");
  }
});

