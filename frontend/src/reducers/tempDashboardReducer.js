import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tempDashboardReducer(state = initialState.tempDashboard,action){
	switch(action.type){
		case types.LOAD_DEFAULT_DASHBOARD_SUCCESS:{
			return action.dashboard;
		}
		default:
			return state;
	}
}