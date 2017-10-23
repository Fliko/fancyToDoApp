import React from 'react';
import ReactDOM from 'react-dom';
import WayPoints from './WayPoints.jsx';
import Map from './Map.jsx';

class MapUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      wayPoints: []
    };
    this.map;
  }
  componentDidMount() {
    this.initMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.mapState !== this.props.mapState) {
      this.openMap(this.props.mapState[1]);
      document.getElementById('mapName').value = this.props.mapState[1].name;
      this.map = this.props.mapState[1].api;
      this.setState({editing: true, wayPoints: [... this.props.mapState[1].api.savedMarkers]});
    }
  }
  openMap(map) {
    document.getElementById('map').remove();
    document.getElementById('container').appendChild(map.map);
  }
  initMap() {
    document.getElementById('mapName').value = '';
    let mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    let map = document.getElementById('map');
    let search = document.getElementById('search');
    let marker = document.getElementById('marker');
    this.map = new this.props.Maps(mapObj, map, search, marker);
    this.setState({wayPoints: [], editing: false});
  }
  saveMap(e) {
    e.preventDefault();
    let name = document.getElementById('mapName').value;
    let data = {name: name, map: map, api:this.map};
    if(!name) {
      alert('Please name your Map');
    }else if(this.state.editing){
      this.newMap();
      this.props.editRoute(this.props.mapState[0],data);
    }else {
      this.newMap();
      this.props.saveMap(data);
    }
  }
  newMap() {
    document.getElementById('map').remove();
    let map = document.createElement('div');
    map.id = 'map';
    map.style.height = '500px';
    let search = document.createElement('input');
    search.id = 'search';
    search.type = 'text';
    map.appendChild(search);
    document.getElementById('container').appendChild(map);
    this.initMap();
  }
  saveMarker(e) {
    e.preventDefault();
    this.setState({wayPoints: [... this.state.wayPoints, this.map.saveMarker()]});
    document.getElementById('search').value = '';
  }
  removeMarker(marker) {
    this.setState({wayPoints: this.map.removeMarker(marker)})
  }
  clearMap(){
    if(!confirm('Unsaved progress will be lost!')) return;
    this.newMap();
  }
  getRoute() {
    this.map.calculateRoute();
  }
  render(){
    return(
      <div>
        <Map />
        <button id='marker' onClick={this.saveMarker.bind(this)}>Save Marker</button>
        <button id='router' onClick={this.getRoute.bind(this)}>Calculate Route</button>
        <WayPoints wayPoints={this.state.wayPoints} removeMarker={this.removeMarker.bind(this)}/>
        <button onClick={this.saveMap.bind(this)}>Save Map</button>
        <button onClick={this.clearMap.bind(this)}>Clear Map</button>
      </div>
    );
  }
}

export default MapUI;
