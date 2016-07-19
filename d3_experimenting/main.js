console.log("Online");

d3.select("body")
	.append("svg")
		.attr("width",50)
		.attr("height",200)
	.append("rect")
		.attr("width",50)
		.attr("height",200)
		.style("fill","blue");

d3.select("body")
	.append("svg")
		.attr("width",50)
		.attr("height",50)
	.append("circle")
		.attr("cx",25)
		.attr("cy",25)
		.attr("r",25)
		.style("fill","blue");

d3.select("body")
	.append("svg")
		.attr("width",150)
		.attr("height",50)
	.append("text")
		.text("Easy peasy")
		.attr("x",0)
		.attr("y",25)
		.style("fill","blue");

var w = 500;
var h = 100;
var padding = 5;
var dataset = [5,10,15,20,25];
var dataset2 = [15,8,9,23,21,5,8,28];
var mc = h/d3.max(dataset);

function colorPicker(v){
	if(v<=20){ return "#666666";}
	else if(v>20){ return "#FF0033";}
}

var svg = d3.select("body")
			.append("svg")
			.attr("width",w)
			.attr("height",h);

svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
		.attr("x",function(d,i){
			return (i * (w / dataset.length));
		})
		.attr("y",function(d){
			return h-d*mc;
		})
		.attr("width", w / dataset.length - padding)
		.attr("height",function(d){
			return d*mc;
		})
		.attr("fill", function(d){
			return "rgb(0, "+ (d*10) +", 0)";
		});

var ast = d3.select("body")
			.append("svg")
			.attr("width",w)
			.attr("height",h+30);

ast.selectAll("rect")
	.data(dataset2)
	.enter()
	.append("rect")
		.attr("x",function(d,i){
			return (i * (w / dataset2.length));
		})
		.attr("y",function(d){
			return h-d*mc+30;
		})
		.attr("width", w / dataset2.length - padding)
		.attr("height",function(d){
			return d*mc;
		})
		.attr("fill", function(d){
			return colorPicker(d);
		});

ast.selectAll("text")
	.data(dataset2)
	.enter()
	.append("text")
	.text(function(d){ return d;})
	.attr({
		"text-anchor":"middle",
		x: function(d,i){return i * (w / dataset2.length) + (w / dataset2.length -padding)/2;},
		y: function(d){return h - (d*4)+14; },
		"font-family":"sans-serif",
		"font-size":12,
		"fill": "#ffffff"
	});

//Scatter plot example 
var h = 100;
var w = 200;

var monthlySales = [
	{"month":10 , "sales":20},
	{"month":20 , "sales":14},
	{"month":30 , "sales":20},
	{"month":40 , "sales":21},
	{"month":50 , "sales":15},
	{"month":60 , "sales":22},
	{"month":70 , "sales":9},
	{"month":80 , "sales":6},
	{"month":90 , "sales":23},
	{"month":100 , "sales":7}
];

var lineFun = d3.svg.line()
	.x(function(d){return d.month*2; })
	.y(function(d){return d.sales;});

var svg3 = d3.select("body").append("svg").attr("width",w).attr("height",h);

var viz = svg3.append("path").attr({
	d: lineFun(monthlySales),
	"stroke":"purple",
	"stroke-width":2,
	"fill": "none"
});

console.log("lad");