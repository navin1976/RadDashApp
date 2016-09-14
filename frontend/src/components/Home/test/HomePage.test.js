import expect from 'expect';
import React from 'react';
import {mount,shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CreateDashboard from '../CreateDashboard';

function setup(){
	const props = {
		val:{
			title:"test",
			description:"test"
		},
		onChange: ()=>{},
		save: ()=>{},
		close:()=>{}
	};
	return shallow(<CreateDashboard {...props}/>);
}

describe('HomePage options dialog', function(){
	it('it renders correctly', () => {
		const wrapper = setup();
		expect(wrapper.find('div').length).toBe(1);
	});

	it('it renders the right options', () => {
		const wrapper = setup();
		expect(wrapper.find('TextInput').length).toBe(2);
	});

	it('it displays 2 options', () => {
		const wrapper = setup();
		expect(wrapper.find('button').length).toBe(2);
	});

	it('it can close when prompted', () => {
		const wrapper = setup();
		expect(wrapper.find('button').at(1).html()).toBe("<button>Close</button>");
	});

	it('it renders the correct option into the form part 1', () => {
		const wrapper = setup();
		expect(wrapper.find('TextInput').at(0).props().value).toBe("test");
	});

	it('it renders the correct option into the form part 2', () => {
		const wrapper = setup();
		expect(wrapper.find('TextInput').at(1).props().value).toBe("test");
	});
});