import expect from 'expect';
import * as dashboardActions from '../dashboardActions';
import * as types from '../actionTypes';

describe('Dashboard actions',function(){
	describe('remove actions',function(){
		it('should create a REMOVE_WIDGET_SUCCESS action',()=>{
			const did = 1;
			const wid = 1;

			const expectedAction = {
				type:types.REMOVE_WIDGET_SUCCESS,
				dashId:1,
				widgetId:1
			};

			const action = dashboardActions.removeWidget(did,wid);
			expect(action).toEqual(expectedAction);
		});

		it('should create a REMOVE_DASHBOARD action',()=>{
			const did = 1;

			const expectedAction = {
				type:types.REMOVE_DASHBOARD,
				dashId:1
			};

			const action = dashboardActions.removeDashboard(did);
			expect(action).toEqual(expectedAction);
		});
	});
	describe('add actions',function(){
		it('should create a ADD_WIDGET_SUCCESS action',()=>{
			const did = 1;
			const wid = {id:1,value:"3"};

			const expectedAction = {
				type:types.ADD_WIDGET_SUCCESS,
				dashId:1,
				widgetDetails:{id:1,value:"3"}
			};

			const action = dashboardActions.addWidgetToDashboardSuccess(did,wid);
			expect(action).toEqual(expectedAction);
		});

		it('should create a ADD_DASHBOARD action',()=>{
			const did = {
				id:'1',
				name:'My dashboard 1'
			};

			const expectedAction = {
				type:types.ADD_DASHBOARD,
				payload:{
					id:'1',
					name:'My dashboard 1'
				}
			};

			const action = dashboardActions.addDashboard(did);
			expect(action).toEqual(expectedAction);
		});
	});
});