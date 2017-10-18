import React from 'react';
import render from 'react-dom';

class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.mapState;
    this.Maps = props.Maps;
  }
}

export default Map;
