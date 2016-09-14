import * as types from './actionTypes';
import * as APIConstant from './apiConstants';
import DataApi from '../api/mockDataApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as axios from 'axios';

export function loadAllDataSourcesSuccess(payload){
	return {type:types.LOAD_ALL_DATASOURCES_SUCCESS,payload};
}
/*
//API function
export function loadAllDataSources(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.get(APIConstant.API_ROOT+"datasources")
		.then(function(response){
			dispatch(loadAllDataSourcesSuccess(response.data));
		}).catch(function(error){
			throw(error);
		})
	};
}*/

//non-api function
export function loadAllDataSources(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return DataApi.getDatasources().then(datasources => {
			dispatch(loadAllDataSourcesSuccess(datasources));
		}).catch(error => {
			throw(error);
		})

	}
}

export function assignDataSource(role,sourceIds){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.put(APIConstant.API_ROOT+"datasources/assign",{
			datasourceIds:sourceIds,
			roleId:role
		})
		.then(function(response){
			response.status >= 200 && response.status<300?console.log("Asigned"):console.log("failed");
		}).catch(function(error){
			throw(error);
		})
	};
}

export function fetchEntityData(config){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.post(APIConstant.API_ROOT+"data/entities",
			{
				"dataSourceId": config.sourceId,
				"endTime": config.endTime,
				"filters": config.filters,
				"startTime": config.startTime
			})
		.then(function(response){

		}).catch(function(error){
			throw(error);
		});
	};
}

export function fetchDataTimeseries(config){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return axios.post(APIConstant.API_ROOT+"data/timeseries",
			{
				"dataSourceId": config.sourceId,
				"endTime": config.endTime,
				"filters":config.filters,
				"granularityId": config.granularityId,
				"metricId": config.metricId,
				"splitBy": config.splitBy,
				"startTime": config.startTime
			}
		)
		.then(function(response){

		}).catch(function(error){
			throw(error);
		});
	};
}