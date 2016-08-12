import delay from './delay';

const data = [
  {
    "metric": 108750,
    "date": "2010-01-01T00:00:00.000Z/2011-01-01T00:00:00.000Z"
  },
  {
    "metric": 380650,
    "date": "2011-01-01T00:00:00.000Z/2012-01-01T00:00:00.000Z"
  },
  {
    "metric": 393695,
    "date": "2012-01-01T00:00:00.000Z/2013-01-01T00:00:00.000Z"
  },
  {
    "metric": 418133,
    "date": "2013-01-01T00:00:00.000Z/2014-01-01T00:00:00.000Z"
  },
  {
    "metric": 437033,
    "date": "2014-01-01T00:00:00.000Z/2015-01-01T00:00:00.000Z"
  },
  {
    "metric": 311548,
    "date": "2015-01-01T00:00:00.000Z/2016-01-01T00:00:00.000Z"
  }
];

class DataApi{
	static getData(){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("THIS IS THE DATA CALL");
				resolve(Object.assign([], data));
			}, delay);
		});
	}
}

export default DataApi;