import * as types from './actionTypes';
import DashboardApi from  '../api/mockDashApi';
import DataApi from '../api/mockDataApi';
import * as axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as APIConstant from './apiConstants';

export function removeWidget(dashId,widgetId){
	return {type: types.REMOVE_WIDGET_SUCCESS,dashId,widgetId};
}

export function loadDashboardSuccess(dashboards){
	return {type: types.LOAD_DASHBOARD_SUCCESS, dashboards};
}

export function loadDataSuccess(dashboardIndex,widgetIndex,payload){
	return {type: types.LOAD_DATA_SUCCESS,dashboardIndex,widgetIndex,payload};
}

export function addWidgetToDashboardSuccess(dashId, widgetDetails){
	return {type: types.ADD_WIDGET_SUCCESS,dashId,widgetDetails};
}

export function removeDashboard(dashId){
	return {type: types.REMOVE_DASHBOARD, dashId};
}

export function addDashboard(payload){
	return {type: types.ADD_DASHBOARD,payload};
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
				let widget;
				for(widget in s.dashboards[d].widgets){
					dispatch(loadDatainDashboards(s.dashboards[d].id,s.dashboards[d].widgets[widget].layout.i));
				}
			}
		}).then(()=>{
			console.log("done");
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadDatainDashboards(d,widget){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DataApi.getData().then(wd=>{
			dispatch(loadDataSuccess(d,widget,wd));
		}).then(()=>{
			console.log("Loaded data for "+d+":"+widget);
		}).catch(error => {
			throw(error);
		});
	};
}

export function addWidgetToDashboard(dashId,widgetDetails){
	return function(dispatch,getState){
		dispatch(addWidgetToDashboardSuccess(dashId, widgetDetails))
	}
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
