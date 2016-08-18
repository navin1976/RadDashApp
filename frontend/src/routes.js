import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CoursesPage from './components/Course/CoursesPage';
import Dashboard from './components/Dashboard/Dashboard';
import ManageCoursePage from './components/Course/ManageCoursePage';
import AdminPage from './components/Admin/AdminPage';
import PermissionPage from './components/Admin/PermissionPage';
import ViewPage from './components/Home/ViewPage';

import GraphTool from './components/Common/GraphTool/GraphTool';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="about" component={AboutPage} />
		<Route path="courses" component={CoursesPage}/>
		<Route path="course" component={ManageCoursePage}/>
		<Route path="course/:id" component={ManageCoursePage}/>
		<Route path="dashboard" component={Dashboard}/>
		<Route path="dashboard/:id" component={Dashboard}/>
		<Route path="admin" component={AdminPage}/>
		<Route path="permissions/:id" component={PermissionPage}/>
		<Route path="demovis" component={ViewPage}/>
		<Route path="editDashboard" component={GraphTool}/>
	</Route>
);