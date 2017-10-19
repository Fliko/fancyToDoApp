import React from 'react';
import render from 'react-dom';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.mapState;
    this.map;
  }
  componentDidMount() {
    let mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    let map = document.getElementById('map');
    let search = document.getElementById('search');
    this.map = new this.props.Maps(mapObj, map, search);
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
  render(){
    return(
      <div>
        <input id="mapName" type='text' placeholder='name your map'></input>
        <div id='map' style={{height:"500px"}}>
          <input id='search' type="text"></input>
        </div>
        <button onClick={this.handleClick.bind(this)}>Save Map</button>
      </div>
    );
  }
}

export default Map;
