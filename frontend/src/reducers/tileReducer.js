import * as types from '../actions/actionTypes';

export default function tileReducer(state=[],action){
	switch(action.type){
		case types.CREATE_TILE:{
			let res = {
				l:{i: 'd', x: 0, y: 0, w: action.tile.width, h: action.tile.height},
				c: action.tile.counter,
				n: action.tile.title
			};
			return [...state,Object.assign({},res)];
		}
		case types.INCREMENT_TILE:{
			return state;
		}
		case types.DECREMENT_TILE:{
			return state;
		}
		case types.UPDATE_TILE:{
			return action.newLayout;
		}
		default:
			return state;
	}
}
