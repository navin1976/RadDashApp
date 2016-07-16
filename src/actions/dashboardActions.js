import * as types from './actionTypes';

export function createTile(tile){
	return {type: types.CREATE_TILE, tile};
}