import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as APIConstant from './apiConstants';
import * as types from './actionTypes';

export function loadDefaultDashboardSuccess(dashboards){
	return {type: types.LOAD_DEFAULT_DASHBOARD_SUCCESS, dashboards};
} 