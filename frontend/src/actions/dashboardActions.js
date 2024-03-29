import * as types from './actionTypes';
import DashboardApi from  '../api/mockDashApi';
import DataApi from '../api/mockDataApi';
import * as axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as APIConstant from './apiConstants';



export function loadDashboardSuccess(dashboards){
	return {type: types.LOAD_DASHBOARD_SUCCESS, dashboards};
}

export function loadDataSuccess(dashboardIndex,widgetIndex,payload){
	return {type: types.LOAD_DATA_SUCCESS,dashboardIndex,widgetIndex,payload};
}

export function loadDashboards(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DashboardApi.getAllDashboards().then(dashboards => {
			dispatch(loadDashboardSuccess(dashboards));
		}).then(()=>{
			let d;
			let s = getState();
			for(d in s.dashboards){
				//console.log(s.dashboards[d]);
				let widget;
				for(widget in s.dashboards[d].widgets){
					//console.log(s.dashboards[d].widgets[widget]);
					dispatch(loadDatainDashboards(d,widget));
				}
			}
		}).then(()=>{
			//console.log("done");
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadDatainDashboards(d,widget){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DataApi.getData(d,widget).then(wd=>{
			dispatch(loadDataSuccess(d,widget,wd));
		}).then(()=>{

		}).catch(error => {
			throw(error);
		});
	};
}






/*for(widget in dashboard.widgets){
				if(widget.request){
					console.log('reached');
				}
			}
export function add_data(data){
  return (dispatch, getState) => {
    var promises = [];

    for (var key in data) {
      var itemData = {'url': data[key]}

      var promise = myApi({
        url: "some_url",
        method: "POST",
        data: itemData
      }).then(
        response => response.json()
      ).then(response => {
        dispatch({response, type: types.ADD_DATA})
      })

      promises.push(promise)
    }

    return Promise.all(promises)
  }
}

*/


export function updateDashboard(id,isDefault){
	const apiPath = APIConstant.API_ROOT+"dashboard/"+isDefault?"default":""+id;
	return function(dispatch){
		return axios.put(apiPath)
		.then(function(response){
			response.status >= 200 && response.status<300?console.log("Updated"):console.log("failed");
		}).catch(function(error){
			throw(error);
		});
	};
}

export function deleteDashboard(id,isDefault){
	const apiPath = APIConstant.API_ROOT+"dashboard/"+isDefault?"default":""+id;
	return function(dispatch){
		return axios.delete(apiPath)
		.then(function(response){
			if(response.status >= 200 && response.status<300){
				console.log("Dashboard successfully deleted");
			}else{
				console.log("Failed to delete dashboard");
			}
		}).catch(function(error){
			throw(error);
		});
	};
}


export function createNewDashboard(title,isDefault){
	const apiPath = APIConstant.API_ROOT+"dashboard/"+isDefault?"default":"";
	return function(dispatch){
		return axios.post(apiPath,{
				title:title,
				isEnabled:true,
				configuration:"string"
			})
		.then(function(response){
			if(response.status >= 200 && response.status<300){
				console.log("Dashboard successfully created");
			}else{
				console.log("Failed to create dashboard");
			}
		}).catch(function(error){
			throw(error);
		});
	};	
}
