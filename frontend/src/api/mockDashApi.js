import delay from './delay';

const dashboards = [
	{id:'dsh1',name:'My dashboard 1', description:'Displays clininc imformation and financial performance'},
	{id:'dsh2',name:'My dashboard 2', description:'Displays clininc imformation and health performance'},
	{id:'dsh3',name:'My dashboard 3', description:'Displays clininc imformation and political performance'}
];

class DashboardApi{
	static getAllDashboards(){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], dashboards));
			}, delay);
		});
	}
}

export default DashboardApi;