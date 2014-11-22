var gulp       = require( 'gulp' )
  , react      = require( 'gulp-react' )
  , uglify     = require( 'gulp-uglify' )
  , concat     = require( 'gulp-concat' )
  , browserify = require( 'gulp-browserify' )
  , karma      = require( 'karma' ).server;

// Builds minified version for <script>
gulp.task( 'build-min', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( uglify() )
               .pipe( concat( 'pager.min.js' ) )
               .pipe( gulp.dest( 'dist/' ) );
});


// Builds version for require( 'react-pager' );
gulp.task( 'build', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( concat( 'pager.js' ) )
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
// var os    = require( 'os' )
//   , isWin = /win*./.test( os.platform() );
// gulp.task( 'test', [ 'build-tests' ], shell.task([
//     isWin 
//         ? 'node_modules\\karma\\bin\\karma start karma.conf.js'
//         : './node_modules/karma/bin/karma start ./karma.conf.js'
// ]));

gulp.task( 'test', [ 'build-tests' ], function ( done ) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done );
});
