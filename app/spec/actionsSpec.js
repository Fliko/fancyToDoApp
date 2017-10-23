import expect from 'expect';
import * as acts from '../src/actions/actions';

describe('Actions', ()=>{
  it('should dispatch ADD_ROUTE action', () => {
    let actionObj = {type:'ADD_ROUTE', data: 'route1', id: 0}
    expect(acts.addRoute('route1')).toEqual(actionObj);
  });
  it('should dispatch REMOVE_ROUTE action', () => {
    let actionObj = {type: 'REMOVE_ROUTE', id: 0};
    expect(acts.removeRoute(0)).toEqual(actionObj);
  });
  it('should dispatch SHOW_MAP action', () => {
    let actionObj = {type: 'SHOW_MAP', id: 0, data: 'route1'};
    expect(acts.showMap(0,'route1')).toEqual(actionObj);
  });
  it('should dispatch EDIT_ROUTE action', () => {
    let actionObj = {type: 'EDIT_ROUTE', id: 0, data: 'route1'};
    expect(acts.editRoute(0,'route1')).toEqual(actionObj);
  });
});
