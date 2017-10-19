const map = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MAP':
      return Object.assign({},action.data);
    default:
      return state;
  }
}
