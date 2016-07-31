import * as types from './actionTypes';

export function createTile(tile){
	return {type: types.CREATE_TILE, tile};
}

export function incrementCtr(k){
	return {type: types.INCREMENT_TILE,k};
}

export function decrementCtr(k){
	return {type: types.DECREMENT_TILE,k};
}

export function updateLayout(newLayout){
	return {type: types.UPDATE_TILE, newLayout};
}
