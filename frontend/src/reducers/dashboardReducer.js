import * as types from '../actions/actionTypes';
import initialState from './initialState';

const widget = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			if(state.layout.i == action.widgetIndex){
				return Object.assign({},state,{
					data: action.payload
				});
			}else{
				return state;
			}
		}
		case types.ADD_WIDGET_SUCCESS:{
			return [...state,action.widgetDetails];
		}
		case types.SAVE_NEW_LAYOUT:{
			let index;
			for(let c=0; c<action.newLayout.length;c++){
				console.log(action[c]);
				if(state.layout.i == action.newLayout[c].i){
					console.log('reached');
					index = c;
					break;
				}
			}
			return Object.assign({},state,{
				layout:action.newLayout[index]
			});
		}
		default:
			return state;
	}
};

const dash = (state,action) => {
	switch(action.type){
		case types.LOAD_DATA_SUCCESS:{
			if(state.id == action.dashboardIndex){
				return Object.assign({},state,{
					widgets: state.widgets.map(w => widget(w,action))
				});
			}else{
				return state;
			}
		}
		case types.REMOVE_WIDGET_SUCCESS:{
			if(state.id == action.dashId){
				if(state.widgets.length == 1){
					return Object.assign({},state,{widgets:[]});	
				}else{
					let index;
					for(index = 0; index<state.widgets.length; index++){
						if(state.widgets[index].layout.i == action.widgetId){
							break;
						}
					}
					if(state.widgets.length - 1 == index){
						return Object.assign({},state,{
							widgets: [...state.widgets.slice(0,index)]
						});
					}else{
						return Object.assign({},state,{
							widgets: [
								...state.widgets.slice(0,index),
								...state.widgets.slice(index+1)
							]
						});
					}	
				}	
			}else{
				return state;
			}
		}
		case types.SAVE_NEW_LAYOUT:{
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
		case types.SAVE_NEW_LAYOUT:{
			return state.map(d => dash(d,action));
		}
		case types.REMOVE_DASHBOARD:{
			if(state.length == 1){
				return [];
			}else{
				let index;
				for(index = 0; index<state.length; index++){
					if(state[index].id == action.dashId){
						break;
					}
				}
				if(index == state.length-1){
					return [...state.slice(0,index)];
				}else{
					return [
						...state.slice(0,index),
						...state.slice(index+1)
					];
				}
			}	
		}
		case types.ADD_DASHBOARD:{
			return [...state,action.payload];
		}
		default:
			return state;
	}
}