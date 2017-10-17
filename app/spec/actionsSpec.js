import expect from 'expect';
import * as acts from '../src/actions/actions';

describe('Actions', ()=>{
  it('should dispatch ADD_ROUTE action', () => {
    let actionObj = {type:'ADD_ROUTE', name: 'route1', id: 0}
    expect(acts.addRoute('route1')).toEqual(actionObj);
  });
  it('should dispatch REMOVE_ROUTE action', () => {
    let actionObj = {type: 'REMOVE_ROUTE', id: 0};
    expect(acts.removeRoute(0)).toEqual(actionObj);
  });
});
