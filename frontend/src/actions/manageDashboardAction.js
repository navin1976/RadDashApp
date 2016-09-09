import * as types from './actionTypes';
import * as APIConstant from './apiConstants';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as axios from 'axios';
import DataTempApi from  '../api/mockTempDataApi';

export function loadDataIntoTempWidget(newData){
	return {type:types.TEST_AND_TEMP,newData};
}

/*
export function temp(config){
	return function(dispatch){
		return axios.post(APIConstant.API_ROOT+"data/timeseries",
			{
				"dataSourceId": config.sourceId,
				"endTime": config.endTime,
				"filters":config.filters,
				"granularityId": config.granularityId,
				"metricId": config.metricId,
				"startTime": config.startTime
			}
		)
		.then(function(response){
			console.log(response.data);
			dispatch(loadDataIntoTempWidget(response.data));
		}).catch(function(error){
			throw(error);
		});
	};
}
*/

export function temp(config){
	console.log("reached");
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DataTempApi.getData(config.granularityId).then(res=>{
			console.log(res);
			dispatch(loadDataIntoTempWidget(res));
		}).catch(error => {
			throw(error);
		});
	};
}