import * as types from '../actions/actionTypes';
import initialState from './initialState';

const widget = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			return Object.assign({},state,{
				data: action.payload
			});
		}
		default:
			return state
	}
}

const dash = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			return Object.assign({},state,{
				widgets: state.widgets.map(w => widget(w,action))
			});
		}
		default:
			return state;
	}
}

export default function dashboardReducer(state = initialState.dashboards,action){
	switch(action.type){
		case types.LOAD_DASHBOARD_SUCCESS:{
			return action.dashboards;
		}
		case types.LOAD_DATA_SUCCESS:{
			return state.map(d => dash(d,action));
		}
		case types.REMOVE_WIDGET_SUCCESS:{
			const elementPos = state.map(function(x){ return x.id;}).indexOf(action.dId);
			const newObj = Object.assign({},state[elementPos]);

			console.log(newObj[widgets]);
			return [
				...state.slice(0,elementPos),
				newObj,
				...state.slice(elementPos+1)
			];

		}
		default:
			return state;
	}
}