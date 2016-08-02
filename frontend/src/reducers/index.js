import {combineReducers} from 'redux';

import courses from './courseReducer';
import authors from './authorReducer';
import layout from './layoutReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import dashboards from './dashboardReducer';

const rootReducer = combineReducers({
	courses,
	authors,
	layout,
	ajaxCallsInProgress,
	dashboards
});

export default rootReducer;