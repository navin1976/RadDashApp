import * as types from './actionTypes';
import * as axios from 'axios';
import * as APIConstant from './apiConstants';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPermissionsSuccess(payload){
	return {type: types.LOAD_PERMISSIONS_SUCCESS , payload};
}

export function loadPermissions(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return axios.get(APIConstant.API_ROOT+"permissions")
		.then(function(response){
			dispatch(loadPermissionsSuccess(response.data));
		}).then(function(){
			//console.log(getState());
		}).catch(function(err){
			throw(err);
		});
	};
}

export function assignPermission(role,permissions){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.put(APIConstant.API_ROOT+"permissions/assign",{
			permissionIds:permissions,
			roleId:role
		}).then(function(response){
			response.status >= 200 && response.status<300?console.log("Asigned"):console.log("failed");
		}).catch(function(error){
			throw(error);
		});
	};
}