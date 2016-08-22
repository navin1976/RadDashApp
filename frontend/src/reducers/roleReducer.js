import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roleReducer(state = initialState.roles,action){
	switch(action.type){
		case types.LOAD_ALL_ROLES_SUCCESS:{
			return action.data;
		}
		case types.UPLOAD_NEW_ROLE:{
			const currId = state[state.length-1].id;
			const nextId = currId + 1;
			return [
				...state,
				Object.assign({"id":nextId},action.newRole)
			];
		}
		default:
			return state;
	}
}