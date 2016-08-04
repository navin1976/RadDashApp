import delay from './delay';

const dashboards = [
	{
		id:'dsh1',
		name:'My dashboard 1',
		description:'Displays clininc imformation and financial performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '2', x: 4, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '3', x: 0, y: 8, w: 5, h: 7},
				"type":"BAR_CHART",
				"request":true
			}
		]
	},
	{
		id:'dsh2',
		name:'My dashboard 2', 
		description:'Displays clininc imformation and health performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '2', x: 4, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '3', x: 0, y: 8, w: 5, h: 7},
				"type":"BAR_CHART",
				"request":true
			}
		]
	},
	{
		id:'dsh3',
		name:'My dashboard 3', 
		description:'Displays clininc imformation and political performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '2', x: 4, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"toBeDetermined",
				"description":"Just some random description",
				"layout":{i: '3', x: 0, y: 8, w: 5, h: 7},
				"type":"BAR_CHART",
				"request":true
			}
		]
	}
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