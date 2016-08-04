/*babel-polyfill required because as of 14/07/16, many
ES6 features needed for the project to work are not
functional.*/

import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configureStore';
import getInitialData from './init';

import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import {loadDashboards} from './actions/dashboardActions';
import {loadLayout} from './actions/layoutActions';
import {loadData} from './actions/dataActions';

import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/toastr/build/toastr.min.css';


const store = configureStore(getInitialData());
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadDashboards());
store.dispatch(loadLayout());
store.dispatch(loadData());

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>, 
	document.getElementById('app')
);