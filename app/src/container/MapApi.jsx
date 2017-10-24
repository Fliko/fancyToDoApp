//    Library for interacting with google maps apis
//Constructor takes an object for initializing the map,
//an element for the map, and an element for places autocomplete
let MapApi = function(mapObj, mapElement, searchElement) {
  this.savedMarkers = [];                       //markers saved in this instance
  this.map = new google.maps.Map(mapElement, {  //draw map on div
    center: mapObj.center,
    zoom: mapObj.zoom
  });
  this.bounds;                                  //map bounds
  this.route;                                   //saved route
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchElement);
  this.autocomplete = new google.maps.places.Autocomplete(searchElement);

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(this.map);

  this.infowindow = new google.maps.InfoWindow();       //current infowindow
  this.marker = new google.maps.Marker({map: this.map});//current marker

  this.map.addListener('click', (event) => {
    this.addPlace(event);
  })
  this.map.addListener('bounds_changed', (event) => {
    if (this.map.getZoom() > 13) this.map.setZoom(13);
  });
  this.autocomplete.addListener('place_changed', () => {//when a place is selected find that place and set
    this.changePlace();                                 //marker infowindow and bounds
  });
  this.marker.addListener('click', () => {              //when you click on the marker show infowindow for it
    this.infowindow.open(this.map, this.marker);
  });
}
//getRoute is a function called from the navigator class in location services called in calculateroute
//position is the devices current location
MapApi.prototype.getRoute = function (position) {
  let endpoint = {lat:position.coords.latitude, lng:position.coords.longitude};
  let stops = this.savedMarkers.reduce((pnts,pos)=>{
    pnts.push({location:pos[1].title, stopover:true});
    return pnts;
  },[]);
  this.directionsService.route({
          origin: endpoint,
          destination: endpoint,
          waypoints: stops,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
}
function checkStatus(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("Geolocation is used for origin and destination of the route, please turn it on.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
MapApi.prototype.calculateRoute = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getRoute.bind(this), checkStatus);
  } else {
    alert('We are sorry, we currently use your current location as the start and end points of our routes. In order to use this app please update or switch browsers.');
  }
};

MapApi.prototype.saveMarker = function(marker = this.marker, infowindow = this.infowindow) {
  this.savedMarkers.push([infowindow, marker]);
  marker.addListener('click', () => {
    infowindow.open(this.map, marker);
  });
  this.setBounds();
  return this.savedMarkers[this.savedMarkers.length - 1];
}
MapApi.prototype.removeMarker = function (marker) {
    this.savedMarkers = this.savedMarkers.filter(point => point !== marker);
    marker[0].close();
    marker[1].setVisible(false);
    return this.savedMarkers;
};
MapApi.prototype.setBounds = function() {
  this.bounds = new google.maps.LatLngBounds();
  for(let i = 0; i < this.savedMarkers.length;i++) {
    this.bounds.extend(this.savedMarkers[i][1].getPosition());
  }
  this.bounds.extend(this.marker.getPosition());
  this.map.fitBounds(this.bounds);
}
MapApi.prototype.initNewPlace = function() {
  //gets rid of other searched places
  this.infowindow.close();
  this.marker.setVisible(false);
  this.marker = new google.maps.Marker({map: this.map});
  this.infowindow = new google.maps.InfoWindow();

  //shows saved searches
  for(let i = 0; i < this.savedMarkers.length;i++) {
    this.savedMarkers[i][1].setVisible(true);
  }
}
MapApi.prototype.addPlace = function (event) {
  this.initNewPlace();
  this.marker.setPosition({lat:event.latLng.lat(), lng:event.latLng.lng()});
  this.marker.setTitle(event.latLng.lat()+', '+event.latLng.lng());
  this.setBounds();
  this.marker.setVisible(true);
  this.infowindow.setContent(`<div id="infowindow-content">
      <span id="place-name"><strong>Custom Location</strong></span><br>
      <span id="place-address">${event.latLng.lat()+', '+event.latLng.lng()}</span>
    </div>`);
  this.infowindow.open(this.map, this.marker);
};
//finds next place searched for
MapApi.prototype.changePlace = function() {
  this.initNewPlace();
  //make sure the place searched is a single address and show it with the other searched places
  let place = this.autocomplete.getPlace();
  if(!place.geometry){
    alert('We are sorry this app does not search, please use a suggested address. thank you :)');
    return;
  }
  this.marker.setPosition(place.geometry.location);
  this.marker.setTitle(place.name);
  this.setBounds();
  this.marker.setVisible(true);

//get all components of an address
  let address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }
  this.infowindow.setContent(`<div id="infowindow-content">
      <img src="${place.icon}" width="20" height="20" id="place-icon">
      <span id="place-name"><strong>${place.name}</strong></span><br>
      <span id="place-address">${address}</span>
    </div>`);
  this.infowindow.open(this.map, this.marker);
}
export default MapApi;
