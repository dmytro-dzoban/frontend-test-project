// Gulp modules
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
	scss: './src/scss/**/*.scss',
	css: './dist/css',
	js: './src/js/**/*.js',
	jsDist: './dist/js',
	img: './src/img/**/*',
	imgDist: './dist/img'
};

// Task: Compile SCSS to CSS
gulp.task('styles', function () {
	return gulp.src(paths.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.stream());
});

// Task: Minify JavaScript
gulp.task('scripts', function () {
	return gulp.src(paths.js)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.jsDist))
		.pipe(browserSync.stream());
});

// Task: Copy images to dist folder
gulp.task('images', function () {
	return gulp.src(paths.img)
		.pipe(gulp.dest(paths.imgDist))
		.pipe(browserSync.stream());
});

// Task: Browser Sync (live reload)
gulp.task('serve', function () {
	browserSync.init({
		server: './'
	});

	gulp.watch(paths.scss, gulp.series('styles'));
	gulp.watch(paths.js, gulp.series('scripts'));
	gulp.watch(paths.img, gulp.series('images'));
	gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default Task (run styles, scripts, images, and serve)
gulp.task('default', gulp.series('styles', 'scripts', 'images', 'serve'));
