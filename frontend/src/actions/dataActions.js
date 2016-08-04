import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import DataApi from  '../api/mockDataApi';


//Needs a loadCoursesFailure/Error action to dispatch

export function loadDataForWidget(id,data){
	return {type: types.LOAD_DATA_WIDGET_SUCCESS,id,data};
}
/*
Dispatch necessary for react-thunk. Arrow functions need to include several
parameters then put into brackets as such (a,b,c) => {}
LoadCourses returns a promise -> dispatches a Success action / Error action
*/
export function loadData(){
	return function(dispatch){
		let url = "http://localhost:1337/data/timeseries";
		dispatch(beginAjaxCall());
		return fetch(url,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				"dataSourceId": 1,
  				"granularityId": 2,
  				"metricId": 1	
			})
		}).then(data => {
			dispatch(loadDataSuccess(data));
		}).catch(error=> {
			throw(error);
		});
	};
}

function loadGenData(url,method,payload){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return fetch(url,{
			method:method,
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(payload)
		}).then(data => {
			dispatch(loadDataSuccess(data));
		}).catch(error=>{
			throw(error);
		});
	};
}

export function loadDataForWidget(id){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return DataApi.getData(id).then(data=>{
			dispatch(loadDataSuccessFor(id,data));
		}).catch(error => {
			throw(error);
		});
	};
}
