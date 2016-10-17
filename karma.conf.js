var path = require('path');

module.exports = function (config) {
	config.set({
		basePath:    './',

		frameworks:  ['jasmine'],

		browsers:    ['PhantomJS' /*, 'Chrome'*/],

		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-webpack'
		],

		files: [
			'spec/**/*.jsx',
		],

		preprocessors: {
			'src/**/*.jsx': ['webpack'],
			'spec/**/*.jsx': ['webpack']
		},

		webpack: { //kind of a copy of your webpack config
			module: {
				loaders: [
					{
						test: /\.jsx$/,
						loader: 'babel',
						exclude: path.resolve(__dirname, 'node_modules'),
						query: {
							presets: ['latest', 'react']
						}
					},
					{
						test: /\.json$/,
						loader: 'json',
					}
				]
			},
			externals: {
				'react/addons': true,
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': true
			}
		},

		singleRun:   true,

		reporters: ['progress'],

		colors: true
	});
};
