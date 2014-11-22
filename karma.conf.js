module.exports = function(config) {
    config.set({
        basePath:    './',
        frameworks:  [ 'jasmine'  /*, 'browserify'*/ ],
        browsers:    [ 'PhantomJS' /*, 'Chrome'*/ ],
        singleRun:   true,
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
	    'karma-phantomjs-launcher',
            'karma-jasmine'
            // 'karma-browserifast'
        ],
        files: [
            { 
                pattern:  'spec/bundle.spec.js',
                watched:  true,
                included: true,
                served:   true
            }, 
        ],
        // browserify: {
        //     files: [
        //         {
        //             pattern: 'spec/bundle.spec.js',
        //             watched:  true,
        //             included: true,
        //             served:   true
        //         }
        //     ]
        // },
        // preprocessors: {
        //     '/**/*.browserify': 'browserify'
        // },
        reporters: [ 'progress' ],
        colors: true,
        logLevel: config.LOG_DEBUG
    });
};
