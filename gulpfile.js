var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    webserver    = require('gulp-webserver'),
    concat       = require('gulp-concat'),
    livereload   = require('gulp-livereload'),
    imagemin     = require('gulp-imagemin');

// gulp.task('scripts', function(){
//     gulp.src('js/*.js')
//         .pipe(plumber())
//         .pipe(uglify())
//         .pipe(concat('justafewicons.min.js'))
//         .pipe(gulp.dest('build/js/'))
//         .pipe(connect.reload());
// });

gulp.task('styles', function(){
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed', sourcemap: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('stylesheets/'));
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('./'));
});



gulp.task('watch', function(){
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch(['index.html'], ['html']);
});


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('default', ['html', 'styles', 'watch', 'webserver']);
