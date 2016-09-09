import delay from './delay';

const dataMonth = [
  {
    "metric": 1200,
    "date": "Jan"
  },
  {
    "metric": 1500,
    "date": "Feb"
  },
  {
    "metric": 700,
    "date": "Mar"
  },
  {
    "metric": 400,
    "date": "Jun"
  },
  {
    "metric": 900,
    "date": "Jul"
  }
];

const dataWeek = [
  {
    "metric": 186,
    "date": "42"
  },
  {
    "metric": 215,
    "date": "43"
  },
  {
    "metric": 279,
    "date": "44"
  },
  {
    "metric": 300,
    "date": "45"
  },
  {
    "metric": 127,
    "date": "46"
  }
];

const dataYear = [
  {
    "metric": 21200,
    "date": "2011"
  },
  {
    "metric": 11500,
    "date": "2012"
  },
  {
    "metric": 23700,
    "date": "2013"
  },
  {
    "metric": 17400,
    "date": "2014"
  }
];

class DataTempApi{
	static getData(gran){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
        if(gran == 3 ){
          resolve(Object.assign([], dataMonth));
        }else if(gran == 1 ){
          resolve(Object.assign([], dataWeek));
        }else{
          resolve(Object.assign([], dataYear));
        }
			}, delay);
		});
	}
}

export default DataTempApi;