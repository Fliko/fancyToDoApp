import React from 'react';
import render from 'react-dom';

const WayPoints = ({wayPoints, removeMarker}) => {
  return (
    <ul>
      {wayPoints.map((marker, i) => {
        return(
          <li key={marker[1].title}>{marker[1].title}
            <button onClick={()=>{removeMarker(marker)}}>R</button>
          </li>
        )
      })}
    </ul>
  );
}

export default WayPoints;
