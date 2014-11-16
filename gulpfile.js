var gulp       = require( 'gulp' )
  , react      = require( 'gulp-react' )
  , uglify     = require( 'gulp-uglify' )
  , concat     = require( 'gulp-concat' )
  , browserify = require( 'gulp-browserify' );

gulp.task( 'build', function () {
    return gulp.src( 'src/pager.jsx' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( uglify() )
               .pipe( concat( 'pager.min.js' ) )
               .pipe( gulp.dest( 'dist/' ) );
});
