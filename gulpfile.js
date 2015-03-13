var gulp       = require( 'gulp' )
  , react      = require( 'gulp-react' )
  , uglify     = require( 'gulp-uglify' )
  , concat     = require( 'gulp-concat' )
  , replace    = require( 'gulp-replace' )
  , browserify = require( 'gulp-browserify' )
  , karma      = require( 'karma' ).server;


// Builds version for "require( 'react-pager' );"
gulp.task( 'build', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( concat( 'pager.js' ) )
               .pipe( gulp.dest( 'dist/' ) );
});


// Builds version for "<script/>"
gulp.task( 'build-min-global', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( replace( "var React = require( 'react' );", '' ))
               .pipe( replace( "module.exports = Pager;", 
                               'window.Pager = window.Pager || Pager;'))
               .pipe( uglify() )
               .pipe( concat( 'pager.min.js' ) )
               .pipe( gulp.dest( 'dist/' ) );
});


// Builds test specs
gulp.task( 'build-tests', [ 'build' ], function () {
    return gulp.src( 'spec/component/*.jsx' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( concat( 'bundle.spec.js' ) )
               .pipe( gulp.dest( 'spec/' ) );
});


// Runs unit-tests
gulp.task( 'test', [ 'build-tests' ], function ( done ) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done );
});




// Build demo components
gulp.task( 'demo-components', function () {
    return gulp.src( 'demo/client/js/components/*.jsx' )
               .pipe( react() )
               .pipe( gulp.dest( 'demo/client/js/components/compiled/' ) );
});


// Build demo
gulp.task( 'prep-demo', ['build', 'demo-components'], function () {
    return gulp.src( 'demo/client/js/main.js' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( concat( 'bundle.js' ) )
               .pipe( gulp.dest( 'demo/client/js/' ) );
});


// Run demo
gulp.task( 'demo', [ 'prep-demo' ], function ( done ) {
    var express   = require( 'express' )
      , args      = require( 'yargs' ).argv;

    var PORT = args.p || args.port || 8001
      , app = express();

    app.use( express.static( './demo/client/' ) );

    app.listen( PORT, function () {
        console.log( 'Server started at port ', PORT );
        done();
    });
});


gulp.task( 'default', [ 'test' ] );
