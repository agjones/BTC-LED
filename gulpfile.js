//Include gulp
var gulp = require('gulp');

//Include plugins
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//Default task - watches
gulp.task('default', ['watch']);

//Build umbrella task
gulp.task('build', ['js-build', 'html-build', 'bower-build', 'node-build']);

//Dev build
gulp.task('dev-build', ['build', 'node-dev-config-build']);

//Prod build
gulp.task('prod-build', ['build', 'node-prod-config-build']);

//Cleans deploy folder
gulp.task('clean', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

//Building JS for deployment
gulp.task('js-build', function() {
    return gulp.src('src/Public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/Public/js'));
});

//Building html for deployment
gulp.task('html-build', function() {
    return gulp.src('src/Public/html/**/*.html')
        .pipe(gulp.dest('dist/Public'));
});

//Moving bower packages for deployment
gulp.task('bower-build', ['angular-build', 'bootstrap-build', 'jquery-build']);

gulp.task('angular-build', function() {
    return gulp.src('bower_components/angular/angular.min.js')
        .pipe(gulp.dest('dist/Public/js'));
});

gulp.task('bootstrap-build', function() {
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/Public/css'));
});

gulp.task('jquery-build', function() {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/Public/js'));
});

gulp.task('node-build', function() {
    gulp.src('dist/Server/config/')
        .pipe(clean());
    return gulp.src(['src/Server/**/*.js', '!src/Server/config/*'])
        .pipe(gulp.dest('dist/Server/'));
});

gulp.task('node-dev-config-build', function() {
    return gulp.src(['src/Server/config/config.dev.js'])
        .pipe(rename('config.js'))
        .pipe(gulp.dest('dist/Server/config'));
});

gulp.task('node-prod-config-build', function() {
    return gulp.src(['src/Server/config/config.prod.js'])
        .pipe(rename('config.js'))
        .pipe(gulp.dest('dist/Server/config'));
});




//Watcher task, monitors angular/node code to restart app and redeploy
gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
});


