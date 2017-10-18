import React from 'react';
import { render } from 'react-dom';
import AddRoute from '../container/AddRoute.jsx';
import RouteList from '../container/RouteList.jsx';

const App = () => {
  return(
    <div className='init'>
      <AddRoute />
      <RouteList />
    </div>
  );
}

export default App;
