const routes = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROUTE':
      return [...state, { id: action.id, data: action.data }];
    case 'REMOVE_ROUTE':
      return state.filter((route)=> route.id !== action.id);
    case 'EDIT_ROUTE':
    return state.map(route =>(
      route.id === action.id ? { data: action.data  } : route
    ));
    default:
      return state;
  }
}

export default routes;
