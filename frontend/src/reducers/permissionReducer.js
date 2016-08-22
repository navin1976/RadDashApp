import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function permissionReducer(state = initialState.permissions,action){
	switch(action.type){
		case types.LOAD_PERMISSIONS_SUCCESS:{
			return action.payload;
		}
		default:
			return state;
	}
}