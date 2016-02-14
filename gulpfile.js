var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    appRootDir = require('app-root-dir').get(),
    reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('./public/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(connect.reload())
});

gulp.task('sass:watch', ['sass']);

gulp.task('transpile', function() {
    return browserify({
            entries: [appRootDir + '/public/app/src/index.js'],
            debug: true
        })
        .on('error', function(err) {
            console.error(err);
            this.emit("end");
        })
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(appRootDir + '/public/app/build'))
        .pipe(connect.reload())
});

gulp.task('transpile:watch', ['transpile']);

gulp.task('serve', ['transpile', 'sass'], function() {
    connect.server({
        root: './',
        port: process.env.PORT || 5000,
        livereload: true
    });
});

gulp.task('default', ['transpile', 'sass', 'serve'], function() {
    // browserSync.init({
    //     server: {
    //         baseDir: "./"
    //     }
    // });
    gulp.watch(['public/app/src/**/*.js'], ['transpile:watch']);
    gulp.watch(['public/assets/sass/**/*.scss'], ['sass:watch']);
});
