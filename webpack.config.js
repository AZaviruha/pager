var path = require('path');
var webpack = require('webpack');

var uglify = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}	
});


module.exports = {
	entry: './src/pager.jsx',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'pager.js',

        libraryTarget: 'umd',
        library: 'Pager'
	},
	
	externals: {
		'react': true
	},

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			}
		],
	},

	plugins: [uglify]
};
