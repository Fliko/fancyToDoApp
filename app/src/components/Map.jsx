import React from 'react';
import { render } from 'react-dom';

const Map = ({saveMarker}) => {
  return(
    <div id="container">
      <input id="mapName" type='text' placeholder='Name your map'></input>
      <div id='map' style={{height:"500px"}}>
        <input id='search' type="text"></input>
        <button id='marker' onClick={saveMarker}>Save Marker</button>
      </div>
    </div>
  )
}

export default Map;
