var counties
var msas

$.getJSON('data/counties.json', function(data) { counties = data })
$.getJSON('data/msas.json', function(data) { msas = data })

function sumCounties(countyData, facilityType) {
  return countyData.reduce(function(memo, county) {
    if (facilityType === 'interstate') {
      if (county.vmt1) {
        memo.vmt += county.vmt1
      }

      if (county.lanemiles1) {
        memo.laneMiles += county.lanemiles1
      }
    } else if (facilityType === 'state_route') {
      if (county.vmt2) {
        memo.vmt += county.vmt2
      }

      if (county.lanemiles2) {
        memo.laneMiles += county.lanemiles2
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
  if (facilityType === 'interstate') {
    $('#selectMSA').parents('.form-group').slideDown()
    $('#selectCounty').parents('.form-group').hide()
  } else if(facilityType === 'state_route') {
    $('#selectCounty').parents('.form-group').slideDown()
    $('#selectMSA').parents('.form-group').hide()
  }
  $('#inputLaneMiles')
    .val('')
    .parents('.form-group').hide()

  $('#results').hide()
})

$('#selectMSA, #selectCounty').change(function() {
  if ($(this).val() === '') {
    $('#inputLaneMiles').parents('.form-group').hide()
    $('#results').hide()
    return
  }

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
  }

  var countyData

  if (facilityType === 'interstate') {
    var msaData = _.find(msas, {msa: msa.toUpperCase()})

    countyData = _.filter(counties, function(item) {
      return _.includes(msaData.counties, item.county)
    })
  } else if (facilityType === 'state_route') {
    countyData = _.filter(counties, {county: county.toUpperCase()})
  }

  var data = sumCounties(countyData, facilityType)
  var elasticity = facilityType === 'interstate' ? 1 : 0.75
  var newVMT = Math.round(newLaneMiles / data.laneMiles * data.vmt * elasticity * 10) / 10

  $('#resultsNone').toggle(data.laneMiles === 0);
  $('#resultsExist').toggle(data.laneMiles !== 0);

  $('#resultsMain').text(newVMT + ' million additional VMT')

  if (facilityType === 'interstate') {
    $('#geographyName').text(msa + ' MSA')
    $('#facilityType').text('Interstate highway')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('1.0')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('<p><small>' + msa + ' MSA consists of ' + countyData.length + ' ' + pluralize('county','counties', countyData.length) + ' (' + formatCountyList(countyData) + ').</small></p>')
    $('#geographyNameNone').text(msa + ' MSA')
  } else if (facilityType === 'state_route') {
    $('#geographyName').text(county + ' County')
    $('#facilityType').text('state route highway')
    $('#currentLaneMiles').text(data.laneMiles + ' lane miles')
    $('#currentVMT').text(data.vmt + ' million')
    $('#elasticity').text('0.75')
    $('#newLaneMiles').text(newLaneMiles + ' lane miles')
    $('#newVMT').text(newVMT + ' million')
    $('#msaNotes').html('')
    $('#geographyNameNone').text(county + ' County')
  }

  $('#results').slideDown();
})
