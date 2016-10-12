const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const concat     = require('gulp-concat');
const rimraf     = require('rimraf');
const join       = require('path').join;

const PATH = {
	src  : 'src/',
	dest : 'dist/',
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


gulp.task('default', ['build']);
