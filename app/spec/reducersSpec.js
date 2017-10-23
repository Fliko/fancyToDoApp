import expect from 'expect';
import routes from '../src/reducers/routes';

describe('Reducers', () => {
  it('should add a route to state', () => {
    let stateBefore = [];
    let stateAfter = [{ id: 0, data: 'route1' }];
    let action = {type: 'ADD_ROUTE', data: 'route1', id: 0}

    expect(routes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should remove a route from state', () => {
    let stateAfter = [];
    let stateBefore = [{ id: 0, name: 'route1' }];
    let action = {type: 'REMOVE_ROUTE', id: 0}

    expect(routes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should edit a route already in state', () => {
    let stateBefore = [{ id: 0, data: 'route1' }];
    let stateAfter = [{ id: 0, data: 'differentRoute1' }];
    let action = {type: 'EDIT_ROUTE', data: 'differentRoute1', id: 0};
    expect(routes(stateBefore,action)).toEqual(stateAfter);
  });
});
