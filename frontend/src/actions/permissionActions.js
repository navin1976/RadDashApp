import * as types from './actionTypes';
import * as axios from 'axios';

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPermissionsSuccess(payload){
	return {type: types.LOAD_PERMISSIONS_SUCCESS , payload};
}

export function loadPermissions(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return axios.get("http://peachdashboard.azurewebsites.net/permissions").then(function(response){
			dispatch(loadPermissionsSuccess(response.data));
		}).then(function(){
			console.log(getState());
		}).catch(function(err){
			throw(err);
		});
	};
}