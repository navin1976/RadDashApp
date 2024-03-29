import delay from './delay';

const layout = [
	{
		l:{i: '1', x: 0, y: 0, w: 4, h: 6},
		c:2,
		n:"Dashboard 1",
		type:"BAR_CHART"
	},
	{
		l:{i: '2', x: 4, y: 0, w: 4, h: 6},
		c:2,
		n:"Dashboard 2",
		type:"LINE_CHART"
	},
	{
		l:{i: '3', x: 0, y: 8, w: 5, h: 7},
		c:6,
		n:"Dashboard 3",
		type:"PIE_CHART"
	}
];

class LayoutApi{
	static getLayout(){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(Object.assign([],layout));
			},delay);
		});
	}
}

export default LayoutApi;