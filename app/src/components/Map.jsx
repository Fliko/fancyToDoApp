import React from 'react';
import { render } from 'react-dom';

const Map = () => {
  return(
    <div id="container">
      <input id="mapName" type='text' placeholder='Name your map'></input>
      <div id='map' style={{height:"500px"}}>
        <input id='search' type="text"></input>
      </div>
    </div>
  )
}

export default Map;
