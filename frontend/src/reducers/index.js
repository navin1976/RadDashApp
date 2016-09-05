import {combineReducers} from 'redux';

import ajaxCallsInProgress from './ajaxStatusReducer';
import dashboards from './dashboardReducer';
import roles from './roleReducer';
import permissions from './permissionReducer';
import dataSources from './dataReducer';
import manageDashboard from './dashboardManagmentReducer';
import defaultDashboard from './defaultDashboardReducer';
import tempDashboard from './tempDashboardReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
	dashboards,
	roles,
	permissions,
	dataSources,
	manageDashboard,
	defaultDashboard,
	tempDashboard
});

export default rootReducer;