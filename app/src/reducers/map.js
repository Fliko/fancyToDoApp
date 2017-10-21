const map = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_MAP':
      return [action.id, action.data];
    default:
      return state;
  }
}

export default map;
