import expect from 'expect';
import React from 'react';
import {mount,shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import OptionForm from '../OptionForm';

function setup(){
	const props = {
		graphOption:{
			title:"test",
			description:"",
			chartType:"",
			width:"",
			height:"",
			datasource:"",
			filter:"",
			granularity:"",
			metric:"",
			startTime:"",
			endTime:""
		},
		onChange:()=>{},
		onDatasourceChange:()=>{} ,
		errors:{},
		allAllowedSources:[],
		allAlowedFilters:[],
		allAlowedGranularities:[],
		allAlowedMetrics:[],
		allAlowedChartTypes:[
			{id:1,value:'BAR_CHART',text:"Bar chart"},
			{id:2,value:'LINE_CHART',text:"Line chart"}
		],
		onSave:()=>{},
		onPreview:()=>{}
	};

	return shallow(<OptionForm {...props}/>);
}

describe('Option Form', function(){
	it('it renders a form object', () => {
		const wrapper = setup();
		expect(wrapper.find('form').length).toBe(1);
	});

	it('it renders a form with the right title', () => {
		const wrapper = setup();
		expect(wrapper.find('h1').html()).toBe("<h1>Manage graph</h1>");
	});

	it('it renders the text inputs', () => {
		const wrapper = setup();
		expect(wrapper.find('TextInput').length).toBe(6);
	});

	it('it renders the select inputs', () => {
		const wrapper = setup();
		expect(wrapper.find('SelectInput').length).toBe(5);
	});

	it('it renders the correct selected value for a text input', () => {
		const wrapper = setup();
		expect(wrapper.find('TextInput').first().props().value).toBe("test");
	});

	it('it renders the select inputs', () => {
		const wrapper = setup();
		expect(wrapper.find('SelectInput').length).toBe(5);
	});

	it('it renders two action buttons', () => {
		const wrapper = setup();
		expect(wrapper.find('button').length).toBe(2);
	})
});