import React from 'react';
import { connect } from 'react-redux';
import { addRoute, editRoute } from '../actions/actions';
import MapUI from '../components/MapUI.jsx';

let MapApi = function(mapObj, mapElement, searchElement) {
  this.savedMarkers = [];
  this.map = new google.maps.Map(mapElement, {
    center: mapObj.center,
    zoom: mapObj.zoom
  });
  this.bounds;
  this.route;
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchElement);
  this.autocomplete = new google.maps.places.Autocomplete(searchElement);

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(this.map);
  this.infowindow = new google.maps.InfoWindow();
  this.marker = new google.maps.Marker({map: this.map});

  this.autocomplete.addListener('place_changed', () => {
    this.changePlace();
  });
  this.marker.addListener('click', () => {
    this.infowindow.open(this.map, this.marker);
  });
}
MapApi.prototype.getRoute = function (position) {
  let endpoint = position.coords.latitude+','+position.coords.longitude;
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
MapApi.prototype.calculateRoute = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getRoute.bind(this));
  } else {
    return;
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

//Method for changing search result and its helpers
MapApi.prototype.showSaved = function() {
  for(let i = 0; i < this.savedMarkers.length;i++) {
    this.savedMarkers[i][1].setVisible(true);
  }
}
MapApi.prototype.initPlace = function() {
  this.marker = new google.maps.Marker({map: this.map});
  this.infowindow = new google.maps.InfoWindow();
  this.infowindow.close();
  this.marker.setVisible(false);
}
MapApi.prototype.changePlace = function() {
  this.initPlace();
  this.showSaved();
  let place = this.autocomplete.getPlace();
  if(!place.geometry){
    alert('We are sorry this app does not search, please use a suggested address. thank you :)');
    return;
  }
  this.marker.setPosition(place.geometry.location);
  this.marker.setTitle(place.name);
  this.setBounds();
  this.marker.setVisible(true);

  let address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }
  this.infowindow.setContent(`<div id="infowindow-content">
      <img src="${place.icon}" width="16" height="16" id="place-icon">
      <span id="place-name"  class="title"><strong>${place.name}</strong></span><br>
      <span id="place-address">${address}</span>
    </div>`);
  this.infowindow.open(this.map, this.marker);
}
const mapStateToProps = state => ({
    mapState: state.curMap,
    Maps: MapApi
});

const mapDispatchToProps = dispatch => ({
  saveMap: (name, data) => {
    dispatch(addRoute(name, data));
  },
  editRoute: (id, data) => {
    dispatch(editRoute(id, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapUI);
