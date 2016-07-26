import {combineReducers} from 'redux';

import courses from './courseReducer';
import authors from './authorReducer';
import layout from './tileReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	courses,
	authors,
	layout,
	ajaxCallsInProgress
});

export default rootReducer;