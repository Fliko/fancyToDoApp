import React from 'react';
import { connect } from 'react-redux';
import { addRoute, editRoute } from '../actions/actions';
import MapUI from '../components/MapUI.jsx';
import MapApi from './MapApi.jsx';

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
