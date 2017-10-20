const map = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_MAP':
      return action.data;
    default:
      return state;
  }
}

export default map;
