import * as types from './actionTypes';
import LayoutApi from  '../api/mockLayoutApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function updateLayout(newLayout){
	return {type: types.UPDATE_TILE, newLayout};
}

export function loadLayoutSuccess(layout){
	return {type: types.LOAD_LAYOUT_SUCCESS, layout};
}

export function loadLayout(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return LayoutApi.getLayout().then(layout => {
			dispatch(loadLayoutSuccess(layout));
		}).catch(error => {
			throw(error);
		});
	};
}