export default function getInitialData(){
	let initData = {
		courses:[{title:"COMPGC02"},{title:"COMPGC03"}],
		layout:[
			{
				l:{i: '1', x: 0, y: 0, w: 3, h: 8},
				c:2,
				n:"Dashboard 1"
			},
			{
				l:{i: '2', x: 1, y: 0, w: 3, h: 2},
				c:2,
				n:"Dashboard 2"
			},
			{
				l:{i: '3', x: 4, y: 0, w: 1, h: 2},
				c:6,
				n:"Dashboard 3"
			}
		]

	};
	return initData;
}