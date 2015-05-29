var gulp         = require('gulp');
var sass         = require('gulp-sass');
var includes     = require('gulp-file-include');
var size         = require('gulp-size');
var svgmin       = require('gulp-svgmin');
var svgstore     = require('gulp-svgstore');
var autoprefixer = require('gulp-autoprefixer');
var cheerio      = require('gulp-cheerio');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync').create();


var paths = {
  sass: './src/assets/scss/*.scss',
  js: './src/assets/js/*.js',
  vendor: './vendor/',
  templates: ['./src/assets/inc/*', '.src/assets/index.html'],
  icons: './bower_components/justafewicons/icons/*',
  build: './build/'
};

gulp.task('styles', function(){
  return gulp.src(paths.sass)
    .pipe(size())
    .pipe(sass({style: 'compressed'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('stylesheets/'))
    .pipe(browserSync.stream());
});


gulp.task('icons', function () {
  return gulp.src(paths.icons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest('./src/inc/'));
});

gulp.task('templates', function() {
  return gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(includes({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('connect', function(){
  browserSync.init({
    server: './'
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['styles']);
  gulp.watch(['src/index.html', './src/assets/inc/*.html'], ['templates']);
  gulp.watch(paths.icons, ['icons', 'templates']);
});



gulp.task('build', ['templates', 'styles', 'icons']);
gulp.task('default', ['build', 'connect', 'watch']);
