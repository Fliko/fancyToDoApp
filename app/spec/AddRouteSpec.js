import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import AddRoute from '../src/container/AddRoute';

const mockStore = configureStore();
let store = mockStore([{ id: 5, name: 'route1' }]);
const wrapper = shallow(<AddRoute store={store}/>);
describe('AddRoute', () => {
  //-------------------------simulate not supported for react 15/16 on enzyme 3 yet
  // it('should clear input field', () => {
  //   let input = wrapper.find('.mapName').at(0);
  //   input.value = 'route2';
  //   wrapper.find('.addMap').at(0).simulate('submit');
  //   expect('').toBe('');
  // });
});
