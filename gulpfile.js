var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
    return del([
        './css/**/*',
        './js/**/*',
        './font/**/*',
        '!./css/theme.css',
        '!./js/theme.js'
    ]);
});

gulp.task('init', ['clean'], function() {
    var scripts = gulp.src(['bower_components/jquery/dist/*', 'bower_components/Materialize/dist/js/*'])
        .pipe(gulp.dest('./js'));
    var fonts = gulp.src(['bower_components/Materialize/dist/font/**/*'])
        .pipe(gulp.dest('./font'));
    return merge(scripts, fonts);
});

gulp.task('styles', function() {
    var dosass = gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
    var donano = gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
    return merge(dosass, donano);
});

gulp.task('watch', function() {
    return gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('default', ['clean', 'init', 'styles']);
