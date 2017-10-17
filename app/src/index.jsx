import React from 'react';
import { render } from 'react-dom';

function App() {
  return(
    <div id='init'>Hello World this is React!</div>
  );
}

render(<App/>, document.getElementById('app'));
export default App;
