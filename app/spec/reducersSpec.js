import expect from 'expect';
import routes from '../src/reducers/routes';

describe('Reducers', () => {
  it('should add a route to state', () => {
    let stateBefore = [];
    let stateAfter = [{ id: 0, name: 'route1' }];
    let action = {type: 'ADD_ROUTE', name: 'route1', id: 0}

    expect(routes(stateBefore, action)).toEqual(stateAfter);
  });

  it('should remove a route from state', () => {
    let stateAfter = [];
    let stateBefore = [{ id: 0, name: 'route1' }];
    let action = {type: 'REMOVE_ROUTE', id: 0}

    expect(routes(stateBefore, action)).toEqual(stateAfter);
  });
});
