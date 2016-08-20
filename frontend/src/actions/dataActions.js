import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as axios from 'axios';

export function loadAllDataSourcesSuccess(payload){
	return {type:types.LOAD_ALL_DATASOURCES_SUCCESS,payload};
}

export function loadAllDataSources(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.get("http://peachdashboard.azurewebsites.net/datasources").then(function(response){
			dispatch(loadAllDataSourcesSuccess(response.data));
		}).catch(function(err){
			throw(err);
		})
	};
}
