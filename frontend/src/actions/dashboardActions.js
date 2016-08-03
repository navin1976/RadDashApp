import * as types from './actionTypes';
import DashboardApi from  '../api/mockDashApi';
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

export function loadDashboards(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
		return DashboardApi.getAllDashboards().then(dashboards => {
			dispatch(loadDashboardSuccess(dashboards));
		}).then(()=>{
			for(let i = 0; i<getState().dashboards.length;i++){
				console.log(getState().dashboards[i].widgets);
			}
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadDatainDashboards(){
	return function(dispatch,getState){
		dispatch(beginAjaxCall());
	};
};

/*
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