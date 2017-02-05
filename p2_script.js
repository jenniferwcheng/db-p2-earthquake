$(document).ready(function() {

  // Grab earthquake data from USGS feed
  var EARTHQUAKE_API = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  $.get(EARTHQUAKE_API)
    .done(function(res) {
      // Output earthquakes to the page
      console.log(res);
      data = res.features;
      simpleEarthquakeDisplay(res.features);

      console.log(data.length);
      for(var i = 0; i < data.length; i++){
        var lat = data[i].geometry.coordinates[1];
        var long = data[i].geometry.coordinates[0];
        populateMap(lat,long);
      }
    })
    .fail(function(error) {
      console.log("Error");
    })

  // Display the earthquake titles on the page
  function simpleEarthquakeDisplay(quakes) {
    var container = $('#sample').empty();
    quakes.forEach(function(quake) {
      var quakeEl = $('<li></li>')
        .text(quake.properties.title)
        .appendTo(container);

    });
  }
});

// Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat: 0, lng: 0}
    });
}

    // Fill the map
function populateMap(lat_val, long_val){
    var myLatLng = {lat: lat_val, lng: long_val};
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
  }
