var React = require('react')

var App = React.createClass({
	render: function(){
		return(
		<div>
			<h1>Hello world from React!</h1>
			<div>webpack on live reload</div>
		</div>
		);
	}
});

module.exports = App;