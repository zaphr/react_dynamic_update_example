import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import App from '../app/App.jsx'

describe('store', function () {
    it('should have a single textarea for user input', function () {
        const wrapper = mount(<App />);
        expect(wrapper.find('textarea')).to.have.length(1);
    });

});