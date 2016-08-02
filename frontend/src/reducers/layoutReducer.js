import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function layoutReducer(state = initialState.layout,action){
	switch(action.type){
		case types.LOAD_LAYOUT_SUCCESS:{
			return action.layout;
		}
		default:
			return state;
	}
}