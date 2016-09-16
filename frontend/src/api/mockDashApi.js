import delay from './delay';

const dashboards = [
	{
		id:'1',
		name:'My Exam dashboard',
		description:'Displays clininc imformation and financial performance',
		author:"Admin",
		widgets:[
			{
				"name":"Exam count (2011-2015) as bar chart",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 7, h: 10},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"Exam count (2011-2015) as line chart",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '2', x: 7, y: 0, w: 7, h: 10},
				"type":"LINE_CHART",
				"request":true
			}
		]
	},
	{
		id:'2',
		name:'My Financial dashboard', 
		description:'Displays clininc imformation and health performance',
		author:"Admin",
		widgets:[
			{
				"name":"examCountData",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 6, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"Percentage monthly budget used",
				"description":"Just some random description",
				"layout":{i: '2', x: 6, y: 0, w: 4, h: 8},
				"type":"BAR_CHART",
				"request":true
			},{
				"name":"Expenses per month in first semester of 2015",
				"description":"Just some random description",
				"layout":{i: '3', x: 0, y: 8, w: 10, h: 7},
				"type":"LINE_CHART",
				"request":true
			}
		]
	},
	{
		id:'3',
		name:'My Patient dashboard', 
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