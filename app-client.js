import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import routes from './routes';

import App from './components/App';

console.log('Hey Dev');

render(<App />, document.getElementById('react-container'));
//render(<Router history={browserHistory} routes={routes} />,document.getElementById('react-container'));