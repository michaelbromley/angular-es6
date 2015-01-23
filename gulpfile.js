var gulp = require('gulp');
var inject = require('gulp-inject');
var to5 = require('gulp-6to5');
var annotate = require('gulp-ng-annotate');
var less = require('gulp-less');

gulp.task('scripts', function () {
    return gulp.src('./src/**/*.js')
        .pipe(to5({ modules: "amd" }))
        .pipe(annotate())
        .pipe(gulp.dest('./build'));
});

gulp.task('mainjs', ['scripts'], function() {
    return gulp.src('./src/**/main.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
    return gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build'));
});

gulp.task('index', ['mainjs', 'scripts', 'styles'], function() {

    var target = gulp.src('./src/index.html');

    var js = gulp.src([
        //'../bower_components/angular/angular.js',
        //'app/utils/annotations.js',
        //'app/app.js',
        //'**/!(app.js)'
        ], {read: false, cwd: './src/'});

    var css = gulp.src([
        'styles/main.css'
        ], {read: false, cwd: './build/'});

    target
        .pipe(inject(js, { addRootSlash: false }))
        .pipe(inject(css, { addRootSlash: false }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['index'], function () {

    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.less', ['styles']);
    gulp.watch('./src/index.html', ['index']);

});


gulp.task('default', ['index']);