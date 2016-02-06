var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver');

gulp.task('sass', function() {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('transpile', function() {
    return browserify({
            entries: ['app/src/index.js'],
            debug: true
        })
        .on('error', function(err) {
            console.error(err);
            this.emit("end");
        })
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('app/build'))
});

gulp.task('transpile:watch', ['transpile'], reload);

gulp.task('serve', function() {
    gulp.src('./')
        .pipe(webserver({
            directoryListing: false,
            open: true
        }))
})
