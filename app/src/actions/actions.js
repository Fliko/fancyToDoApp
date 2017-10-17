let curId = 0;
export const addRoute = name => ({
  type: 'ADD_ROUTE',
  name: name,
  id: curId++
});

export const removeRoute = id => ({
  type: 'REMOVE_ROUTE',
  id: id
});
