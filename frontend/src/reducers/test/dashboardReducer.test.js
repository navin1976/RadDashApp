import expect from 'expect';
import dashboardReducer from '../dashboardReducer';
import * as actions from '../../actions/dashboardActions';

const dsh =  [
	{
		id:'1',
		name:'My dashboard 1',
		description:'Displays clininc imformation and financial performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 7, h: 10},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '2', x: 7, y: 0, w: 7, h: 10},
				"type":"LINE_CHART",
				"request":true
			}
		]
	},
	{
		id:'2',
		name:'My dashboard 2', 
		description:'Displays clininc imformation and health performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '2', x: 4, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '3', x: 0, y: 8, w: 5, h: 7},
				"type":"BAR_CHART",
				"request":true
			}
		]
	}
];

const wid = {
	"name":"examCountData",
	"description":"Line chart showing the count of exam instances in a given interval",
	"layout":{i: '4', x: 7, y: 0, w: 7, h: 10},
	"type":"LINE_CHART",
	"request":true
};

describe('Dashboard reducer',function(){
	it('should load the right amount of dashboards', () => {
		const initialState = [];
		const action = actions.loadDashboardSuccess(dsh);
		const newState = dashboardReducer(initialState,action);
		expect(newState.length).toEqual(2);
	});
	it('the dashboards should have the right amount of widgets', () => {
		const initialState = [];
		const action = actions.loadDashboardSuccess(dsh);
		const newState = dashboardReducer(initialState,action);
		expect(newState[0].widgets.length).toEqual(2);
	});
	it('the dashboards should be loaded correctly', () => {
		const initialState = [];
		const action = actions.loadDashboardSuccess(dsh);
		const newState = dashboardReducer(initialState,action);
		expect(newState[0].id).toEqual('1');
		expect(newState[1].id).toEqual('2');
	});
	it('the dashboards should be loaded correctly if an intial state is present', () => {
		const initialState = [{id:2,text:"blabla"}];
		const action = actions.loadDashboardSuccess(dsh);
		const newState = dashboardReducer(initialState,action);
		expect(newState[0].id).toEqual('1');
		expect(newState[1].id).toEqual('2');
	});
});

describe('Widget reducer',function(){
	it('should load the right amount of dashboards', () => {
		const action = actions.addWidgetToDashboardSuccess('1',wid);
		const newState = dashboardReducer(dsh,action);
		expect(newState.length).toEqual(2);
	});
	it('should update the number of widgets', () => {
		const action = actions.addWidgetToDashboardSuccess('1',wid);
		const newState = dashboardReducer(dsh,action);
		expect(newState[0].widgets.length).toEqual(3);
	});
	it('should add widget to second dashboard', () => {
		const action = actions.addWidgetToDashboardSuccess('2',wid);
		const newState = dashboardReducer(dsh,action);
		expect(newState[1].widgets.length).toEqual(4);
	});
	it('should remove widget from dashboards', () => {
		const action = actions.removeWidget('2','3');
		const newState = dashboardReducer(dsh,action);
		expect(newState[1].widgets.length).toEqual(2);
	});
	it('should remove widget from dashboards after being added', () => {
		expect(dsh[1].widgets.length).toEqual(3);
	});

});