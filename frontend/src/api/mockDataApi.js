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
            resolve(Object.assign([], data2));
          }else if(d=='2' && widget=='2'){
            resolve(Object.assign([], data2));
          }else if(d=='2' && widget=='3'){
            resolve(Object.assign([], data2));
          }else if(d=='3' && widget=='1'){
            resolve(Object.assign([], data2));
          }else if(d=='3' && widget=='2'){
            resolve(Object.assign([], data2));
          }else if(d=='3' && widget=='3'){
            resolve(Object.assign([], data2));
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