import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import RoleApi from '../api/mockRolesApi';
import * as APIConstant from './apiConstants';
import * as axios from 'axios';

export function loadAllRolesSuccess(data){
	return {type: types.LOAD_ALL_ROLES_SUCCESS,data};
}

export function loadAllRoles(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return RoleApi.getAllRoles().then(data => {
			dispatch(loadAllRolesSuccess(data));
		}).then(()=>{
			//console.log("Dispatched roles");
		}).catch(error => {
			throw(error);
		});
	};
}

export function saveNewRole(newRole){
	return {type: types.UPLOAD_NEW_ROLE,newRole};
}

/*
export function loadAllRoles(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.get(APIConstant.API_ROOT+"/roles")
		.then(function(response){
			dispatch(loadAllRolesSuccess(response.data));
		}).catch(function(error){
			throw(error);
		});
	};
}
*/