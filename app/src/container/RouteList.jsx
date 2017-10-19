import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { removeRoute, showMap } from '../actions/actions';

let RouteList = ({ routes, removeRoute, showMap } ) => {
  return (
    <ul>
      {routes.map((route) => {
        return(<li key={route.id}>
          {route.name}
          <button onClick={()=>removeRoute(route.id)}>Remove</button>
          <button onClick={()=>showMap(route.name, route.data)}>Show</button>
        </li>)
      })}
    </ul>
  );
}

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = dispatch => ({
  removeRoute: id => {
    dispatch(removeRoute(id))
  },
  showMap: (name, data) => {
    dispatch(showMap(name, data))
  }
});

RouteList = connect(mapStateToProps,mapDispatchToProps)(RouteList)
export default RouteList;
