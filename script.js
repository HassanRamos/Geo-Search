let map;

// function to desplay deffault map
function createMap () {
  const options = {
    center: { lat:  -4.036878, lng: 39.669571},
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);


  let input = document.getElementById('search');
  let searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
 
 // array to store markers 
  let markers = [];
  
  searchBox.addListener('places_changed', function () {
    let places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });
    
    map.fitBounds(bounds);
  });
}  
