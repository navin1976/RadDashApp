/*eslint-disable no-mixed-spaces-and-tabs*/
import delay from './delay';

const data = [
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
];

const data2 = [
  {
    "metric": 108750,
    "date": "1"
  },
  {
    "metric": 380650,
    "date": "2"
  },
  {
    "metric": 393695,
    "date": "3"
  },
  {
    "metric": 418133,
    "date": "4"
  }
];

const data5 = [
  {
    "metric": 1082750,
    "date": "Q1"
  },
  {
    "metric": 1380650,
    "date": "Q2"
  },
  {
    "metric": 1393695,
    "date": "Q3"
  },
  {
    "metric": 918133,
    "date": "Q4"
  }
];

const data3 = [
  {
    "name":"Nurse",
    "value":103
  },{
    "name":"GP",
    "value":234
  },{
    "name":"Specialist",
    "value":156
  },{
    "name":"Surgeon",
    "value":87
  },{
    "name":"Assistant",
    "value":47
  },{
    "name":"Managers",
    "value":67
  }
];

const data4 = [
  {
    "name":"Pending",
    "value":15
  },{
    "name":"Treated",
    "value":68
  },{
    "name":"In process",
    "value":17
  }
];

const data6 = [
  {
    "metric": 0,
    "date": "Jan"
  },
  {
    "metric": 137000,
    "date": "Feb"
  },
  {
    "metric": 216000,
    "date": "Mar"
  },
  {
    "metric": 298000,
    "date": "Apr"
  },
  {
    "metric": 402000,
    "date": "Jun"
  },
  {
    "metric": 452000,
    "date": "Jul"
  },
  {
    "metric": 527000,
    "date": "Aug"
  }
];

const data7 = [
  {
    "metric": 3500,
    "date": "Mon"
  },
  {
    "metric": 2850,
    "date": "Tue"
  },
  {
    "metric": 1975,
    "date": "Wed"
  },
  {
    "metric": 899,
    "date": "Thu"
  },
  {
    "metric": 124,
    "date": "Fri"
  }
];

const data8 = [
  {
    "metric": 0,
    "date": "Mon"
  },
  {
    "metric": 700,
    "date": "Tue"
  },
  {
    "metric": 1600,
    "date": "Wed"
  },
  {
    "metric": 2400,
    "date": "Thu"
  },
  {
    "metric": 3380,
    "date": "Fri"
  }
];
 

const datasources = [
  {
    "granularities": [
      {
        "id": 2,
        "name": "weekly"
      },
      {
        "id": 3,
        "name": "monthly"
      }
    ],
    "filters": [
      {
        "id": 1,
        "name": "dimension1",
        "title": "Dimension 1",
        "canGetDistinct": true,
        "filterType": "categorical",
        "datasource": 1
      }
    ],
    "metrics": [
      {
        "id": 1,
        "name": "count"
      },
      {
        "id": 2,
        "name": "average"
      },
      {
        "id": 3,
        "name": "min"
      },
      {
        "id": 4,
        "name": "max"
      },
      {
        "id": 5,
        "name": "countDistinct"
      },
      {
        "id": 6,
        "name": "sum"
      }
    ],
    "id": 1,
    "name": "datasource_forbidden"
  },
  {
    "granularities": [
      {
        "id": 1,
        "name": "daily"
      },
      {
        "id": 3,
        "name": "monthly"
      },
      {
        "id": 5,
        "name": "yearly"
      }
    ],
    "filters": [
      {
        "id": 5,
        "name": "scannerID",
        "title": "Dimension 1",
        "canGetDistinct": true,
        "filterType": "categorical",
        "datasource": 2
      },
      {
        "id": 6,
        "name": "roomID",
        "title": "Dimension 2",
        "canGetDistinct": false,
        "filterType": "categorical",
        "datasource": 2
      }
    ],
    "metrics": [
      {
        "id": 1,
        "name": "count"
      },
      {
        "id": 2,
        "name": "average"
      },
      {
        "id": 3,
        "name": "min"
      },
      {
        "id": 4,
        "name": "max"
      },
      {
        "id": 5,
        "name": "countDistinct"
      },
      {
        "id": 6,
        "name": "sum"
      }
    ],
    "id": 2,
    "name": "dummy_medical2"
  }
];

class DataApi{
	static getData(d,widget){
      return new Promise((resolve, reject) => {
  			setTimeout(() => {
          if(d=='1'){
            resolve(Object.assign([], data));
          }else if(d=='2' && widget=='1'){
            resolve(Object.assign([], data5));
          }else if(d=='2' && widget=='2'){
            resolve(Object.assign([], data3));
          }else if(d=='2' && widget=='3'){
            resolve(Object.assign([], data6));
          }else if(d=='3' && widget=='1'){
            resolve(Object.assign([], data7));
          }else if(d=='3' && widget=='2'){
            resolve(Object.assign([], data8));
          }else if(d=='3' && widget=='3'){
            resolve(Object.assign([], data4));
          }else{
            resolve(Object.assign([], data2));
          }
  			}, delay);
  		});
    }

  static getDatasources(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], datasources));
      }, delay);
    });
  }
}

export default DataApi;