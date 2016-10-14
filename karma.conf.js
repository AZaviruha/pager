module.exports = (config) => {
	config.set({
		basePath:    './',

		frameworks:  ['browserify', 'jasmine'],

		browsers:    ['PhantomJS' /*, 'Chrome'*/],

		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-babel-preprocessor',
			'karma-browserify',
		],

		files: [
			'spec/**/*.jsx',
		],

		preprocessors: {
			'src/**/*.jsx': ['babel', 'browserify'],
			'spec/**/*.jsx': ['babel', 'browserify']
		},

		babelPreprocessor: {
			options: {
				// presets: ['airbnb']
			},
		},

		browserify: {
			debug: true,

			transform: [
				['babelify'],
				// ['babelify', { presets: ['airbnb'] }]
			],

			configure(bundle) {
				bundle.on('prebundle', () => {
					bundle.external('react/addons');
					bundle.external('react/lib/ReactContext');
					bundle.external('react/lib/ExecutionEnvironment');
				});
			},
		},

		singleRun:   true,

		reporters: ['progress'],

		colors: true,

        // logLevel: config.LOG_DEBUG
	});
};
