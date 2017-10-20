import React from 'react';
import ReactDOM from 'react-dom';
import WayPoints from './WayPoints.jsx';
import Map from './Map.jsx';

class MapUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wayPoints: []
    };
    this.map;
  }
  componentDidMount() {
    this.initMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.mapState !== this.props.mapState) {
      this.initMap();
      this.openMap(this.props.mapState);
    }
  }
  openMap(map) {
    document.getElementById('map').remove();
    document.getElementById('container').appendChild(map.map);
  }
  initMap() {
    let mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    let map = document.getElementById('map');
    let search = document.getElementById('search');
    let marker = document.getElementById('marker');
    this.map = new this.props.Maps(mapObj, map, search, marker);
  }
  saveMap(e) {
    e.preventDefault();
    let name = document.getElementById('mapName').value;
    let data = {name: name, map: map};
    this.newMap();
    if(!name) alert('Please name your Map');
    else this.props.saveMap(name, data);
  }
  newMap() {
    document.getElementById('map').remove();
    let map = document.createElement('div');
    map.id = 'map';
    map.style.height = '500px';
    let search = document.createElement('input');
    search.id = 'search';
    search.type = 'text';
    let save = document.createElement('button');
    save.id = 'marker';
    save.innerHTML = 'Save Marker';
    map.appendChild(search);
    map.appendChild(save);
    document.getElementById('container').appendChild(map);
    document.getElementById('marker').addEventListener('click', this.saveMarker.bind(this));
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
    this.initMap();
    this.setState({wayPoints: []});
  }
  render(){
    return(
      <div>
        <Map saveMarker={this.saveMarker.bind(this)}/>
        <WayPoints wayPoints={this.state.wayPoints} removeMarker={this.removeMarker.bind(this)}/>
        <button onClick={this.saveMap.bind(this)}>Save Map</button>
        <button onClick={this.clearMap.bind(this)}>Clear Map</button>
      </div>
    );
  }
}

export default MapUI;
