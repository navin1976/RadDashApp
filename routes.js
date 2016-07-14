import React from 'react';
import {Route, IndexRoute} from 'react-router';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="about" component={AboutPage} />
	</Route>
);