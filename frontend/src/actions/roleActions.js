import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import RoleApi from '../api/mockRolesApi';
import * as APIConstant from './apiConstants';
import * as axios from 'axios';

export function loadAllRolesSuccess(data){
	return {type: types.LOAD_ALL_ROLES_SUCCESS,data};
}

//Local get all roles function
export function loadAllRoles(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return RoleApi.getAllRoles().then(data => {
			dispatch(loadAllRolesSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}
//Local
export function saveNewRole(newRole){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return RoleApi.addRole(newRole).then(data => {
			dispatch(loadAllRolesSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}
//Local
export function deleteRole(roleId){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return RoleApi.delete(roleId).then(data => {
			dispatch(loadAllRolesSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}

export function updateRole(roleId,p,d){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return RoleApi.setOptions(roleId,p,d).then(data => {
			dispatch(loadAllRolesSuccess(data));
		}).catch(error => {
			throw(error);
		});
	};
}

/*
//API call
export function saveNewRole(newRole){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.post(APIConstant.API_ROOT+"/roles",{description:newRole})
		.then(function(response){
			dispatch(loadAllRoles());
		}).catch(function(error){
			throw(error);
		});
	};
}

//API call
export function deleteRole(roleId){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.delete(APIConstant.API_ROOT+"/roles/"+roleId)
		.then(function(response){
			dispatch(loadAllRoles());
		}).catch(function(error){
			throw(error);
		});
	};
}

//API call for roles
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