import React from 'react';
import render from 'react-dom';
import WayPoints from './WayPoints.jsx';

class Map extends React.Component {
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
      this.openMap(this.props.mapState);
    }
  }
  openMap(map) {
    document.getElementById('map').remove();
    document.body.appendChild(map);

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
    let map = document.getElementById('map');
    let data = map;
    this.clearMap();
    if(!name) alert('Please name your Map');
    else this.props.saveMap(name, data);
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
    document.getElementById('map').remove();
    let map = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);
    this.initMap();
    this.setState({wayPoints: []});
  }
  render(){
    return(
      <div>
        <input id="mapName" type='text' placeholder='Name your map'></input>
        <div id='map' style={{height:"500px"}}>
          <input id='search' type="text"></input>
        </div>
        <button id='marker' onClick={this.saveMarker.bind(this)}>Save Marker</button>
        <WayPoints wayPoints={this.state.wayPoints} removeMarker={this.removeMarker.bind(this)}/>
        <button onClick={this.saveMap.bind(this)}>Save Map</button>
        <button onClick={this.clearMap.bind(this)}>Clear Map</button>
      </div>
    );
  }
}

export default Map;
