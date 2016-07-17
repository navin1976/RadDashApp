import {combineReducers} from 'redux';

import courses from './courseReducer';
import layout from './tileReducer';

const rootReducer = combineReducers({
	courses,
	layout
});

export default rootReducer;