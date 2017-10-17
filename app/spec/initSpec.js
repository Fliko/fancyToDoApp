import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import App from '../src/index';
const wrapper = shallow(<App />);
describe('Init', () => {
  it('renders app', () => {
    expect(wrapper.containsAnyMatchingElements([<div id='init'>Hello World this is React!</div>])).toBe(true);
  });
});
