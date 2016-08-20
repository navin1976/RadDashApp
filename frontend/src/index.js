/*babel-polyfill required because as of 14/07/16, many
ES6 features needed for the project to work are not
functional.*/

/*eslint-disable import/default*/
import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configureStore';
import getInitialData from './init';

import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';


import {loadDashboards} from './actions/dashboardActions';
import {loadAllDataSources} from './actions/dataActions';
import {loadAllRoles,logRequest} from './actions/roleActions';
import {loadPermissions} from './actions/permissionActions';

import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/toastr/build/toastr.min.css';


const store = configureStore(getInitialData());

store.dispatch(loadDashboards());
store.dispatch(loadAllDataSources());
store.dispatch(loadAllRoles());
store.dispatch(logRequest());
store.dispatch(loadPermissions());

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>, 
	document.getElementById('app')
);