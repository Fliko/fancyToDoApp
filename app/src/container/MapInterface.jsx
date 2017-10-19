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
}

MapApi.prototype.getCenter = function() {
  return this.map.getCenter();
};

MapApi.prototype.getZoom = function() {
  return this.map.getZoom();
};

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
