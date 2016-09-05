import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function defaultDashboardReducer(state = initialState.defaultDashboard,action){
	switch(action.type){
		case types.LOAD_DEFAULT_DASHBOARD_SUCCESS:{
			return action.dashboard;
		}
		default:
			return state;
	}
}