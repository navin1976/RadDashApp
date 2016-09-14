import expect from 'expect';
import React from 'react';
import {mount,shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import RoleTable from '../RoleTable';

function setup(){
	const props = {
		roles:[{id:1},{id:2}],
		deleteHandler: ()=>{return;}
	};

	return shallow(<RoleTable {...props}/>);
}

describe('Role table', function(){
	it('it renders a table correctly', () => {
		const wrapper = setup();
		expect(wrapper.find('table').length).toBe(1);
	});

	it('table has all the right attibutes', () => {
		const wrapper = setup();
		expect(wrapper.find('tbody').length).toBe(1);
		expect(wrapper.find('thead').length).toBe(1);
	});

	it('table has 2 list rows when 2 role objects are passed', () => {
		const wrapper = setup();
		expect(wrapper.find('RoleListRow').length).toBe(2);
	});

	it('table has 3 columns that render properly', () => {
		const wrapper = setup();
		expect(wrapper.find('th').length).toBe(3);
	});
});