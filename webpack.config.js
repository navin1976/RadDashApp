module.exports = {
	entry: {
		myApp:[
			'webpack-dev-server/client?http://localhost:8080',
			"./app-client.js",
		]
	},
	output: {
		filename:"public/bundle.js"
	},
	module:{
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|app-server.js)/,
				loader: 'babel',
				query:{
					presets:['react','es2015']
				}
			}
		]
	}

};