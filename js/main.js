$('[name="facilityType"]').change(function() {
  var facilityType = $('[name="facilityType"]:checked').val()
  if (facilityType === "interstate") {
    $('#selectMSA').parents('.form-group').show()
    $('#selectCounty').parents('.form-group').hide()
  } else if(facilityType === "state_route") {
    $('#selectCounty').parents('.form-group').show()
    $('#selectMSA').parents('.form-group').hide()
  }
  $('#inputLaneMiles').parents('.form-group').hide()
})

$('#selectMSA, #selectCounty').change(function() {
  if ($(this).val() === '') {
    $('#inputLaneMiles').parents('.form-group').hide()
    return
  }

  $('#inputLaneMiles').parents('.form-group').show()
})

$('#vmtForm').submit(function(e) {
  e.preventDefault();

  $('#inputLaneMiles').removeClass('is-invalid')

  // Validate Miles
  var laneMiles = parseInt($('#inputLaneMiles').val(), 10)
  if (isNaN(laneMiles)) {
    $('#inputLaneMiles').addClass('is-invalid')
    return;
  }
})
