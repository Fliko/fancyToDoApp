import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { removeRoute, showMap } from '../actions/actions';

let RouteList = ({ routes, removeRoute, showMap } ) => {
  return (
    <ul>
      {routes.map((route) => {
        return(<li key={route.id}>
          {route.data.name}
          <button onClick={()=>removeRoute(route.id)}>Remove</button>
          <button onClick={()=>showMap(route.id,route.data)}>Show</button>
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
    dispatch(removeRoute(id));
  },
  showMap: (id,data) => {
    dispatch(showMap(id,data));
  }
});

RouteList = connect(mapStateToProps,mapDispatchToProps)(RouteList)
export default RouteList;
