import expect from 'expect';
import React from 'react';
import {mount,shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import DataSourceRow from '../DataSourceRow';

function setup(){
	const props = {
		source:{id:1,name:"test",description:"test"},
		status:true,
		handle: (a,b) => {return;}
	};

	return shallow(<DataSourceRow {...props}/>);
}

describe('Data source row', function(){
	it('it renders a table row', () => {
		const wrapper = setup();
		expect(wrapper.find('tr').length).toBe(1);
	});

	it('it renders necessary columns', () => {
		const wrapper = setup();
		expect(wrapper.find('td').length).toBe(3);
	});

	it('it renders an input', () => {
		const wrapper = setup();
		expect(wrapper.find('input').length).toBe(1);
	});

	it('it renders the permission id correctly', () => {
		const wrapper = setup();
		expect(wrapper.find('td').first().html()).toBe("<td>test</td>");
	})

	it('it renders the permission description correctly', () => {
		const wrapper = setup();
		expect(wrapper.find('td').at(1).html()).toBe("<td>test</td>");
	})

	it('it passes the right status to the input', () => {
		const wrapper = setup();
		expect(wrapper.find('input').props().checked).toBe(true);
	})
});