import {combineReducers} from 'redux';

import courses from './courseReducer';
import authors from './authorReducer';
import layout from './layoutReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import dashboards from './dashboardReducer';
import roles from './roleReducer';
import permissions from './permissionReducer';

const rootReducer = combineReducers({
	courses,
	authors,
	layout,
	ajaxCallsInProgress,
	dashboards,
	roles,
	permissions
});

export default rootReducer;