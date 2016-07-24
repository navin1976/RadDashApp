import {combineReducers} from 'redux';

import courses from './courseReducer';
import authors from './authorReducer';
import layout from './tileReducer';

const rootReducer = combineReducers({
	courses,
	authors,
	layout
});

export default rootReducer;