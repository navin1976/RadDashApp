import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roleReducer(state = initialState.roles,action){
	switch(action.type){
		case types.LOAD_ALL_ROLES_SUCCESS:{
			return action.data;
		}
		default:
			return state;
	}
}