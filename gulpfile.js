var gulp         = require('gulp');
var cssnext      = require('gulp-cssnext');
var cssmin       = require('gulp-cssmin');
var includes     = require('gulp-file-include');
var size         = require('gulp-size');
var svgmin       = require('gulp-svgmin');
var svgstore     = require('gulp-svgstore');
var autoprefixer = require('gulp-autoprefixer');
var cheerio      = require('gulp-cheerio');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync').create();


var paths = {
  cssI: './src/assets/css/jafi--app.css',
  css: './src/assets/css/*.css',
  js: './src/assets/js/*.js',
  vendor: './vendor/',
  templates: ['./src/assets/inc/*', '.src/assets/index.html'],
  icons: './bower_components/justafewicons/icons/*',
  build: './build/'
};

gulp.task('styles', function(){
  return gulp.src(paths.cssI)
    .pipe(size())
    .pipe(cssnext())
    .pipe(autoprefixer('last 2 version'))
    .pipe(cssmin())
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
  gulp.watch(paths.css, ['styles']);
  gulp.watch(['src/index.html', './src/assets/inc/*.html'], ['templates']);
  gulp.watch(paths.icons, ['icons', 'templates']);
});



gulp.task('build', ['templates', 'styles', 'icons']);
gulp.task('default', ['build', 'connect', 'watch']);
