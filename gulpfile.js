var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    serve = require('gulp-serve'),
    prefix = require('gulp-autoprefixer');



gulp.task('scripts', function(){
    gulp.src('javascript/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});

gulp.task('styles', function(){
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed', sourcemap: true}))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('watch', function(){
    gulp.watch('javascript/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
