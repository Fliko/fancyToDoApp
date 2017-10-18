import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import Remove from '../components/Remove.jsx';

let RouteList = ({ routes, removeRoute }) => {
  return (
    <ul>
      {routes.map((route) => {
        return(<li key={route.id}>
          {route.name}
          {/* <Remove remove={()=>removeRoute(route.id)}/> */}
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
