import {combineReducers} from 'redux';

import courses from './courseReducer';
import tiles from './tileReducer';

const rootReducer = combineReducers({
	courses,
	tiles
});

export default rootReducer;