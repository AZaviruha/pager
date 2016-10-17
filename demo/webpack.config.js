var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './js/main.jsx'),

	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			}
		],
	}
};
