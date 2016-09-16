import delay from './delay';

const dashboard = {
		id:'default',
		name:'My Exam dashboard',
		description:'Displays clininc imformation and financial performance',
		author:"Admin",
		widgets:[
			{
				"name":"Exam count (2011-2015) as bar chart",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '1', x: 0, y: 0, w: 7, h: 10},
				"type":"BAR_CHART",
				"request":true,
				"data":[
  {
    "metric": 108750,
    "date": "2010"
  },
  {
    "metric": 380650,
    "date": "2011"
  },
  {
    "metric": 393695,
    "date": "2012"
  },
  {
    "metric": 418133,
    "date": "2013"
  },
  {
    "metric": 437033,
    "date": "2014"
  },
  {
    "metric": 311548,
    "date": "2015"
  }
]

			},{
				"name":"Exam count (2011-2015) as line chart",
				"description":"Line chart showing the count of exam instances in a given interval",
				"layout":{i: '2', x: 7, y: 0, w: 7, h: 10},
				"type":"LINE_CHART",
				"request":true,
				"data":[
  {
    "metric": 108750,
    "date": "2010"
  },
  {
    "metric": 380650,
    "date": "2011"
  },
  {
    "metric": 393695,
    "date": "2012"
  },
  {
    "metric": 418133,
    "date": "2013"
  },
  {
    "metric": 437033,
    "date": "2014"
  },
  {
    "metric": 311548,
    "date": "2015"
  }
]
			}
		]
	};

class DefaultApi{
	static getDefaultDashboard(){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign({}, dashboard));
			}, delay);
		});
	}
}

export default DefaultApi;