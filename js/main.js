var counties
var msas
var page = $('html, body')

page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
  page.stop()
})

function sumCounties(countyData, facilityType) {
  return countyData.reduce(function(memo, county) {
    if (facilityType === 'class1') {
      if (county.vmt1) {
        memo.vmt += county.vmt1
      }

      if (county.lanemiles1) {
        memo.laneMiles += county.lanemiles1
      }
    } else if (facilityType === 'class2') {
      if (county.vmt2) {
        memo.vmt += county.vmt2
      }

      if (county.lanemiles2) {
        memo.laneMiles += county.lanemiles2
      }
    }

    } else if (facilityType === 'class3') {
      if (county.vmt3) {
        memo.vmt += county.vmt3
      }

      if (county.lanemiles3) {
        memo.laneMiles += county.lanemiles3
      }
    }

    } else if (facilityType === 'class4') {
      if (county.vmt4) {
        memo.vmt += county.vmt4
      }

      if (county.lanemiles4) {
        memo.laneMiles += county.lanemiles4
      }
    }

    } else if (facilityType === 'class5') {
      if (county.vmt5) {
        memo.vmt += county.vmt5
      }

      if (county.lanemiles5) {
        memo.laneMiles += county.lanemiles5
      }
    }

    } else if (facilityType === 'class6') {
      if (county.vmt6) {
        memo.vmt += county.vmt6
      }

      if (county.lanemiles6) {
        memo.laneMiles += county.lanemiles6
      }
    }

    } else if (facilityType === 'class7') {
      if (county.vmt7) {
        memo.vmt += county.vmt7
      }

      if (county.lanemiles7) {
        memo.laneMiles += county.lanemiles7
      }
    }

    } else if (facilityType === 'class8') {
      if (county.vmt8) {
        memo.vmt += county.vmt8
      }

      if (county.lanemiles8) {
        memo.laneMiles += county.lanemiles8
      }
    }

    } else if (facilityType === 'class9') {
      if (county.vmt9) {
        memo.vmt += county.vmt9
      }

      if (county.lanemiles9) {
        memo.laneMiles += county.lanemiles9
      }
    }

    return memo
  }, {vmt: 0, laneMiles: 0})
}

function formatCountyList(countyData) {
  if (countyData.length === 1) {
    return _.startCase(countyData[0].county.toLowerCase()) + ' County'
  }
  return countyData.reduce(function(memo, county, index) {
    if (index === countyData.length - 1) {
      memo += ' and '
    } else if (index !== 0) {
      memo += ', '
    }

    memo += _.startCase(county.county.toLowerCase())

    return memo
  }, '')
}

function pluralize(singular, plural, count) {
  if (count === 1) {
    return singular
  }

  return plural
}

$('[name="facilityType"]').change(function() {
  var facilityType = $('[name="facilityType"]:checked').val()
  $('#selectMSA').val('')
  $('#selectCounty').val('')
  if (facilityType === 'class1') {
    $('#selectMSA').parents('.form-group').slideDown()
    $('#selectCounty').parents('.form-group').hide()
  } else if(facilityType === 'class2') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class3') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class4') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class5') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class6') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class7') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class8') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  } else if(facilityType === 'class9') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  $('#inputLaneMiles')
    .val('')
    .parents('.form-group').hide()

  $('#results').hide()
})

$('#selectMSA, #selectCounty').change(function() {
  $('#inputLaneMiles').val('')

  if ($(this).val() === '') {
    $('#inputLaneMiles').parents('.form-group').hide()
    return
  }

  $('#results').hide()
  $('#inputLaneMiles').parents('.form-group').slideDown()
})

$('#vmtForm').submit(function(e) {
  e.preventDefault();

  $('#results').hide()

  var facilityType = $('[name="facilityType"]:checked').val()
  var newLaneMiles = parseFloat($('#inputLaneMiles').val())
  var county = $('#selectCounty').val()
  var msa = $('#selectMSA').val()

  $('#inputLaneMiles').removeClass('is-invalid')

  // Validate Miles
  if (isNaN(newLaneMiles)) {
    $('#inputLaneMiles').addClass('is-invalid')
    return;
  } else if (newLaneMiles < 0) {
    $('#inputLaneMiles').addClass('is-invalid')
    alert('This calculator cannot be used to estimate VMT effects of capacity reductions or lane type conversions.')
  }

  var countyData

  if (facilityType === 'class1') {
    var msaData = _.find(msas, {msa: msa.toUpperCase()})

    countyData = _.filter(counties, function(item) {
      return _.includes(msaData.counties, item.county)
    })
  } else if (facilityType === 'class2') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class3') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class4') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class5') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class6') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class7') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class8') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  } else if (facilityType === 'class9') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }
  var data = sumCounties(countyData, facilityType)
  var elasticity = facilityType === 'class1' ? 1 : 0.75
  var newVMT = Math.round(newLaneMiles / data.laneMiles * data.vmt * elasticity * 10) / 10

  $('#resultsNone').toggle(data.laneMiles === 0);
  $('#resultsExist').toggle(data.laneMiles !== 0);

 /* if (msa === 'Napa') {
    $('#resultsNoneNapa').show()
    $('#resultsNoneOther').hide()
  } else {
    $('#resultsNoneNapa').hide()
    $('#resultsNoneOther').show()
  }
*/
  
  $('#resultsMain').text(newVMT + ' million additional VMT/year')

  if (facilityType === 'class1') {
    $('#geographyName').text(msa + ' MSA')
    $('#facilityType').text('Urban interstate, freeway/expressway')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('1.0')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('<p><small>' + msa + ' MSA consists of ' + countyData.length + ' ' + pluralize('county','counties', countyData.length) + ' (' + formatCountyList(countyData) + ').</small></p>')
    $('#geographyNameNone').text(msa + ' MSA')
    
  } else if (facilityType === 'class2') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Urban principal arterial')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
  }
  } else if (facilityType === 'class3') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Urban minor arterial')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class4') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Urban collector')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class5') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Urban local road')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class6') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Rural interstate and principal arterial')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class7') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Rural minor arterial')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class8') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Rural major and minor collector')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
 } else if (facilityType === 'class9') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('Rural local road')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
 }
  $('#results').show()
  page.animate({ scrollTop: $(document).height() }, 2000)

  if (window.gtag) {
    gtag('event', 'click', {
      event_category: 'calculate',
      event_label: facilityType === 'class1' ? msa : county,
      value: newLaneMiles
    });
  }
})

// On page load, get data
$.getJSON('/data/counties.json', function(data) { counties = data })
$.getJSON('/data/msas.json', function(data) { msas = data })

// On page load, if there is a selection, trigger change
if ($('[name="facilityType"]:checked').val()) {
  $('[name="facilityType"]').trigger('change')
}

if ($('#selectMSA:visible, #selectCounty:visible').val()) {
  $('#selectMSA:visible, #selectCounty:visible').trigger('change')
}
