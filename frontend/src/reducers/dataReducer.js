import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.data,action){
	switch(action.type){
		case types.LOAD_ALL_DATASOURCES_SUCCESS:{
			return action.payload;
		}
		default:
			return state;
	}
}