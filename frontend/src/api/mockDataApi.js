import delay from './delay';

const data = [
  {
    "metric": 108750,
    "date": "2010-2011"
  },
  {
    "metric": 380650,
    "date": "2011-2012"
  },
  {
    "metric": 393695,
    "date": "2012-2013"
  },
  {
    "metric": 418133,
    "date": "2013-2014"
  },
  {
    "metric": 437033,
    "date": "2014-2015"
  },
  {
    "metric": 311548,
    "date": "2015-2016"
  }
];

class DataApi{
	static getData(){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], data));
			}, delay);
		});
	}
}

export default DataApi;