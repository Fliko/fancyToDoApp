import React from 'react';
import render from 'react-dom';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.mapState;
    this.map;
  }
  componentDidMount() {
    this.map = new this.props.Maps({lat:29.4241, lng: 98.4936}, 13, document.getElementById('map'),document.getElementById('search'));
  }
  render(){
    return(<div id='map' style={{height:"500px"}}>
      <input id='search' type="text"></input>
    </div>);
  }
}

export default Map;
