let curId = 0;
export const addRoute = (name, data) => ({
  type: 'ADD_ROUTE',
  name: name,
  data: data,
  id: curId++
});

export const removeRoute = id => ({
  type: 'REMOVE_ROUTE',
  id: id
});

export const showMap = (name,data) => ({
  type: 'SHOW_MAP',
  name: name,
  data:data
});
