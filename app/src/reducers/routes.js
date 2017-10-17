const routes = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROUTE':
      return [...state, { id: action.id, name: action.name }];
    case 'REMOVE_ROUTE':
      return state.filter((route)=> route.id !== action.id);
  }
}

export default routes;
