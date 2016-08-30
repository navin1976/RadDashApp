import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dashboardManagmentReducer(state = initialState.manageDashboard,action){
	switch(action.type){
		case types.TEST_AND_WAIT:{
			return action.payload;
		}
		default:
			return state;
	}
}