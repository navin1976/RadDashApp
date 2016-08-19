import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import RoleApi from '../api/mockRolesApi';

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

export function logRequest(){
	return function(dispatch){
		return fetch("http://peachdashboard.azurewebsites.net/permissions").then(data =>{
			//console.log(data.json());
		}).catch(error => {
			throw(error);
		});
	};
}

export function saveNewRole(newRole){
	return {type: types.UPLOAD_NEW_ROLE,newRole};
}