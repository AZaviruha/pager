const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const concat     = require('gulp-concat');
const rimraf     = require('rimraf');
const join       = require('path').join;
const Server     = require('karma').Server;
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const buffer     = require('vinyl-buffer');

const PATH = {
	src  : 'src/',
	dest : 'dist/',
	spec : 'spec/component/',
};


gulp.task('clear', (next) => {
	rimraf(PATH.dest, next);
});


gulp.task('build', ['clear'], () =>
	gulp.src(join(PATH.src, '**/*.jsx'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('pager.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(PATH.dest))
);

gulp.task('test', (done) => {
	new Server({
		configFile: `${__dirname}/karma.conf.js`,
	}, done).start();
});


gulp.task('default', ['build']);
