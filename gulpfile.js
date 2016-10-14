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
	demo : 'demo/client/js/',
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


// ==================== DEMO ==================== //

gulp.task('clear-demo', (next) => {
	rimraf(join(PATH.demo, 'bundle.js'), next);
});

gulp.task('build-demo', ['clear-demo'], () => {
	browserify(join(PATH.demo, 'main.js'))
		.transform('babelify')
		.bundle()
		.on('error', function error(err) {
			console.error(err);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulp.dest(PATH.demo));
});

gulp.task('run-demo', ['build-demo'], (done) => {
	const express = require('express');
	const args    = require('yargs').argv;

	const PORT = args.p || args.port || 8001;
	const app = express();

	app.use(express.static('./demo/client/'));

	app.listen(PORT, () => {
		console.log('Server started at port ', PORT);
		done();
	});
});


gulp.task('default', ['build']);
