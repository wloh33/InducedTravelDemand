$('[name="facilityType"]').change(function(){
  var facilityType = $('[name="facilityType"]:checked').val()
  if(facilityType === "interstate"){
    $('#selectMSA').parents('.form-group').show()
    $('#selectCounty').parents('.form-group').hide()
  } else if(facilityType === "state_route") {
    $('#selectCounty').parents('.form-group').show()
    $('#selectMSA').parents('.form-group').hide()
  }
  $('#inputLaneMiles').parents('.form-group').hide()
})

$('#selectMSA, #selectCounty').change(function(){
  $('#inputLaneMiles').parents('.form-group').show()
})
