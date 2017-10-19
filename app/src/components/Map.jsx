import React from 'react';
import render from 'react-dom';
import WayPoints from './WayPoints.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curMap: props.mapState,
      wayPoints: []
    };
    this.map;
  }
  componentDidMount() {
    let mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    let map = document.getElementById('map');
    let search = document.getElementById('search');
    let marker = document.getElementById('marker');
    this.map = new this.props.Maps(mapObj, map, search, marker);
  }
  handleClick(e) {
    e.preventDefault();
    let name = document.getElementById('mapName').value;
    let data = {center: this.map.getCenter(),
                zoom: this.map.getZoom(),
              };
    if(!name) alert('Please name your Map');
    else this.props.saveMap(name, data);
  }
  saveMarker(e) {
    e.preventDefault();
    this.map.saveMarker();
    console.log(this.map.savedMarkers)
    this.setState({wayPoints: [... this.map.savedMarkers]});
  }
  render(){
    return(
      <div>
        <input id="mapName" type='text' placeholder='Name your map'></input>
        <div id='map' style={{height:"500px"}}>
          <input id='search' type="text"></input>
        </div>
        <button id='marker' onClick={this.saveMarker.bind(this)}>Save Marker</button>
        <WayPoints wayPoints={this.state.wayPoints}/>
        <button onClick={this.handleClick}>Save Map</button>
      </div>
    );
  }
}

export default Map;
