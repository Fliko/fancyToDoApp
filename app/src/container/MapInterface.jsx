import React from 'react';
import { connect } from 'react-redux';
import { saveMap } from '../actions/actions';
import Map from '../components/Map.jsx';

let MapApi = (center, zoom, mapElement, searchElement) => {
  let map = new google.maps.Map(mapElement, {
    center: center,
    zoom: zoom
  });
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchElement);
  let autocomplete = new google.maps.places.Autocomplete(searchElement);
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
