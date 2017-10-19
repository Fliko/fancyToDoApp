import React from 'react';
import { render } from 'react-dom';
import MapUI from '../container/MapInterface.jsx';
import RouteList from '../container/RouteList.jsx';

const App = () => {
  return[
    <MapUI key='map' />,
    <RouteList key='list' />
  ];
}

export default App;
