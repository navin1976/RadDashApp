import * as types from './actionTypes';
import DashboardApi from  '../api/mockDashApi';
import DataApi from '../api/mockDataApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function createTile(tile){
	return {type: types.CREATE_TILE, tile};
}

export function updateLayout(newLayout){
	return {type: types.UPDATE_TILE, newLayout};
}

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