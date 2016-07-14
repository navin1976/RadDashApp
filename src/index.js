/*babel-polyfill required because as of 14/07/16, many
ES6 features needed for the project to work are not
functional.*/

import 'babel-polyfill';


import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import routes from './routes';
//import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
	<Router history={browserHistory} routes={routes}/>, 
	document.getElementById('app')
);