let curId = 0;
export const addRoute = (data) => ({
  type: 'ADD_ROUTE',
  data: data,
  id: curId++
});

export const removeRoute = id => ({
  type: 'REMOVE_ROUTE',
  id: id
});

export const showMap = (id,data) => ({
  type: 'SHOW_MAP',
  id: id,
  data:data
});

export const editRoute = (id,data) => ({
  type: 'EDIT_ROUTE',
  id:id,
  data:data
});
