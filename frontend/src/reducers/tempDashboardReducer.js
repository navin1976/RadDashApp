import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tempDashboardReducer(state = initialState.tempDashboard,action){
	switch(action.type){
		default:
			return state;
	}
}