export default function getInitialData(){
	let layout = [
		{
			name:"Dashboard 1",	
			layout:{i: 'a', x: 0, y: 0, w: 1, h: 2},
			counter:0
		},
		{
			name:"Dashboard 2",
			layout:{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
			counter:0
		},
		{
			name:"Dashboard 3",
			layout:{i: 'c', x: 4, y: 0, w: 1, h: 2},
			counter:0
		}
	];
	return layout;
}