import delay from './delay';

const dashboards = [
	{id:'dsh1',name:'Finance imformation', description:'Displays clininc imformation and financial performance'},
	{id:'dsh2',name:'Health imformation', description:'Displays clininc imformation and health performance'},
	{id:'dsh3',name:'Political imformation', description:'Displays clininc imformation and political performance'}
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