import * as types from '../actions/actionTypes';
import initialState from './initialState';

const widget = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			return Object.assign({},state,{
				data: action.payload
			});
		}
		case types.REMOVE_WIDGET_SUCCESS:{
			if(state.layout.i !== action.widgetId){
				return state;
			}else{
				return state;
			}
		}
		case types.ADD_WIDGET_SUCCESS:{
			return [...state,action.widgetDetails];
		}
		default:
			return state;
	}
};

const dash = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			return Object.assign({},state,{
				widgets: state.widgets.map(w => widget(w,action))
			});
		}
		case types.REMOVE_WIDGET_SUCCESS:{
			if(state.id == action.dashId){
				return Object.assign({},state,{
					widgets: state.widgets.map(w => widget(w,action))
				});
			}else{
				return state;
			}
		}
		case types.ADD_WIDGET_SUCCESS:{
			if(state.id == action.dashId){
				return Object.assign({},state,{
					widgets: widget(state.widgets,action)
				});
			}else{
				return state;
			}
		}
		default:
			return state;
	}
};

export default function dashboardReducer(state = initialState.dashboards,action){
	switch(action.type){
		case types.LOAD_DASHBOARD_SUCCESS:{
			return action.dashboards;
		}
		case types.LOAD_DATA_SUCCESS:{
			return state.map(d => dash(d,action));
		}
		case types.REMOVE_WIDGET_SUCCESS:{
			return state.map(d => dash(d,action));
		}
		case types.ADD_WIDGET_SUCCESS:{
			return state.map(d => dash(d,action));
		}
		default:
			return state;
	}
}