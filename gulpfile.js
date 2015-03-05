var gulp       = require( 'gulp' )
  , react      = require( 'gulp-react' )
  , uglify     = require( 'gulp-uglify' )
  , concat     = require( 'gulp-concat' )
  , replace    = require( 'gulp-replace' )
  , browserify = require( 'gulp-browserify' )
  , karma      = require( 'karma' ).server;


// Builds version for require( 'react-pager' );
gulp.task( 'build', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( concat( 'pager.js' ) )
               .pipe( gulp.dest( 'dist/' ) );
});


// Builds version for <script>
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
