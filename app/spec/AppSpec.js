import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import App from '../src/components/App';

const wrapper = shallow(<App />);
describe('Init', () => {
  it('renders app', () => {
    expect(wrapper.find('.init').exists()).toBe(true);
  });
});
