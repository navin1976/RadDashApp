import * as types from './actionTypes';
import DashboardApi from  '../api/mockDashApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

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

export function loadDashboardSuccess(dashboards){
	return {type: types.LOAD_DASHBOARD_SUCCESS, dashboards};
}

export function loadDashboards(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return DashboardApi.getAllDashboards().then(dashboards => {
			dispatch(loadDashboardSuccess(dashboards));
		}).catch(error => {
			throw(error);
		});
	};
}