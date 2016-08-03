import React from 'react';

const AdminPage = ()=>{
	return(
		<div>
			<div className="info-context">
				<h1>Manage dashboards</h1>
				<p>Click here to manage the default dashboards for the different roles</p>
			</div>
			<div className="info-context">
				<h1>Manage permissions</h1>
				<p>Click here to manage the access to data based on the user's role</p>
			</div>
			<div className="info-context">
				<h1>Add new role</h1>
				<p>This will alow you to add new roles</p>
			</div>
		</div>
	);
};

export default AdminPage;