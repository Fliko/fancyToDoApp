import React from 'react';
import render from 'react-dom';

const WayPoints = ({wayPoints}) => {
  return (
    <ul>
      {wayPoints.map((marker, i) => {
        return(
          <li key={marker[1].title}>{marker[1].title}</li>
        )
      })}
    </ul>
  );
}

export default WayPoints;
