import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { removeRoute } from '../actions/actions';

let RouteList = ({ routes, removeRoute } ) => {
  return (
    <ul>
      {routes.map((route) => {
        return(<li key={route.id}>
          {route.name}
          <button onClick={()=>removeRoute(route.id)}>R</button>
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
  }
});

RouteList = connect(mapStateToProps,mapDispatchToProps)(RouteList)
export default RouteList;
