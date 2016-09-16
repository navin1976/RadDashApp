import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as APIConstant from './apiConstants';
import * as types from './actionTypes';
import DefaultApi from '../api/mockDefault';


export function loadDefaultDashboardSuccess(dashboards){
	return {type: types.LOAD_DEFAULT_DASHBOARD_SUCCESS, dashboards};
}

export function loadDefaultDashboard(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DefaultApi.getDefaultDashboard().then(wd=>{
			dispatch(loadDefaultDashboardSuccess(wd));
		}).catch(error => {
			throw(error);
		});
	};
}