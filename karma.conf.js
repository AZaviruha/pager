module.exports = function(config) {
    config.set({
        basePath:    './',
        frameworks:  [ 'jasmine' ],
        browsers:    [ 'PhantomJS' /*, 'Chrome'*/ ],
        singleRun:   true,
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
	    'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        files: [
            { 
                pattern:  'spec/bundle.spec.js',
                watched:  true,
                included: true,
                served:   true
            }, 
        ],
        reporters: [ 'progress' ],
        colors: true
        // logLevel: config.LOG_DEBUG
    });
};
