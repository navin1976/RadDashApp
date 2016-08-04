import delay from './delay';

const data = [
	{letter:"A",frequency:"0.08167"},
	{letter:"B",frequency:"0.06167"},
	{letter:"C",frequency:"0.03167"},
	{letter:"D",frequency:"0.04267"},
	{letter:"E",frequency:"0.01267"},
	{letter:"F",frequency:"0.01967"},
	{letter:"G",frequency:"0.05567"},
];

class DataApi{
	static getData(d,widget){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("THIS IS THE ID: "+widget);
				resolve(Object.assign([], data));
			}, delay);
		});
	}
}

export default DataApi;