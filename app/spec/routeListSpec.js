import React from 'react';
// import expect from 'expect';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import RouteList from '../src/container/RouteList';

const mockStore = configureStore();
let store = mockStore({routes:[{ id: 5, data: {name:'route1'} }, { id: 6, data: {name:'route2'} }]});
const wrapper = shallow(<RouteList store={store}/>);

describe('RouteList', ()=> {
  it('should render a list of routes', () => {
    expect(wrapper.find('li').at(0).exists()).equal(true);
    expect(wrapper.find('li').at(1).exists()).equal(true);
  });
  // it('should remove List item from routes', () => {
  //   let remove = wrapper.find('button').at(0);
  //   remove.simulate('click');
  //   expect(wrapper.find('ul').at(0).children()).to.have.length(1);
  // });
});
