import React from 'react';
import { connect } from 'react-redux';
import { addRoute } from '../actions/actions'

let AddRoute = ( {dispatch} ) => {
  let name;
  return (
    <div>
        <form
          onSubmit={(e)=>{
            e.preventDefault();
            if (!name.value.trim()) return;
            dispatch(addRoute(name.value));
            name.value = '';
          }}>
          <input className="mapName" placeholder="Name your map" ref={(value)=>{name=value}}></input>
          <button className="addMap" type="submit">Add Map</button>
        </form>
    </div>
  );
}

AddRoute = connect()(AddRoute)

export default AddRoute;
