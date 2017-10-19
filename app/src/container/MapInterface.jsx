import React from 'react';
import { connect } from 'react-redux';
import { addRoute } from '../actions/actions';
import Map from '../components/Map.jsx';

let MapApi = function(mapObj, mapElement, searchElement) {
  this.map = new google.maps.Map(mapElement, {
    center: mapObj.center,
    zoom: mapObj.zoom
  });
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchElement);
  this.autocomplete = new google.maps.places.Autocomplete(searchElement);

  let infowindow = new google.maps.InfoWindow();
  this.initInfoWindow();
  let infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  let marker = new google.maps.Marker({map: this.map});

  this.autocomplete.addListener('place_changed', () => {
    this.changePlace(infowindow, marker);
  });
}

MapApi.prototype.getCenter = function() {
  return this.map.getCenter();
};

MapApi.prototype.getZoom = function() {
  return this.map.getZoom();
};

MapApi.prototype.initInfoWindow = function() {
  let iw = document.createElement('div');
  iw.id = 'infowindow-content';
  let name = document.createElement('p');
  name.id = 'place-name';
  name.style.fontWeight = 'bold';
  let addr = document.createElement('span');
  addr.id = 'place-address';
  iw.appendChild(name);
  iw.appendChild(addr);
  document.body.appendChild(iw);
}
MapApi.prototype.changePlace = function(infowindow, marker) {
  infowindow.close();
  marker.setVisible(false);
  let place = this.autocomplete.getPlace();
  if(!place.geometry){
    alert('We are sorry this app does not search, please use a suggested address. thank you :)');
    return;
  }
  if (place.geometry.viewport) {
    this.map.fitBounds(place.geometry.viewport);
  } else {
    this.map.setCenter(place.geometry.location);
    this.map.setZoom(14);
  }
  marker.setPosition(place.geometry.location);
  marker.setVisible(true);

  var address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }

  infowindowContent.children['place-name'].textContent = place.name;
  infowindowContent.children['place-address'].textContent = address;
  infowindow.open(map, marker);
}
const mapStateToProps = state => ({
    mapState: state.curMap,
    Maps: MapApi
});

const mapDispatchToProps = dispatch => ({
  saveMap: (name, data) => {
    dispatch(addRoute(name, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
